import { useEffect, useState } from 'react';
import { Parser } from 'expr-eval';

function App() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [expression, setExpression] = useState('');
  const [lastEvaluated, setLastEvaluated] = useState(false);
  const themes = ['theme1', 'theme2', 'theme3'];

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...themes);
    root.classList.add(themes[themeIndex]);
  }, [themeIndex]);

  const toggleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const operators = ['+', '-', 'x', '/'];

  const formatNumberWithCommas = (numStr: string) => {
    if (numStr === 'Error') return numStr;
    // Handle decimals
    if (numStr.includes('.')) {
      const [intPart, decPart] = numStr.split('.');
      return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + decPart;
    }
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleInput = (value: string) => {
    if (expression === 'Error') {
      setExpression('');
    }

    if (lastEvaluated) {
      if (/[0-9.]/.test(value)) {
        setExpression(value);
        setLastEvaluated(false);
        return;
      } else if (operators.includes(value)) {
        setExpression(expression + value);
        setLastEvaluated(false);
        return;
      } else if (value === 'del') {
        setExpression('');
        setLastEvaluated(false);
        return;
      } else if (value === 'reset') {
        setExpression('');
        setLastEvaluated(false);
        return;
      }
    }

    if (value === 'del') {
      if (expression.length === 1) {
        setExpression('');
      } else {
        setExpression((prev) => prev.slice(0, -1));
      }
      setLastEvaluated(false);
      return;
    }

    if (value === 'reset') {
      setExpression('');
      setLastEvaluated(false);
      return;
    }

  if (value === '=') {
  try {
    const sanitizedExpr = expression.replace(/x/g, '*');
    const parser = new Parser();
    const evalResult = parser.evaluate(sanitizedExpr);
    setExpression(evalResult.toString());
    setLastEvaluated(true);
  } catch {
    setExpression('Error');
    setLastEvaluated(true);
  }
  return;
}

    if (operators.includes(value)) {
      if (expression === '') {
        if (value === '-') {
          setExpression(value);
        }
        return;
      }
      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar)) {
        setExpression(expression.slice(0, -1) + value);
        setLastEvaluated(false);
        return;
      }
    }

    setExpression((prev) => prev + value);
    setLastEvaluated(false);
  };

  useEffect(() => {
    const handleKey = (e : KeyboardEvent) => {
      const key = e.key;

      if (/[0-9.]/.test(key)) {
        handleInput(key);
      } else if (key === '*') {
        handleInput('x');
      } else if (['+', '-', '/'].includes(key)) {
        handleInput(key);
      } else if (key === 'Enter') {
        e.preventDefault();
        handleInput('=');
      } else if (key === 'Backspace') {
        handleInput('del');
      } else if (key.toLowerCase() === 'r') {
        handleInput('reset');
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [expression, lastEvaluated]);

  const buttons = [
    '7', '8', '9', 'del',
    '4', '5', '6', '+',
    '1', '2', '3', '-',
    '.', '0', '/', 'x',
    'reset', '='
  ];

  return (
    <div className="bg-[var(--bg-main)] text-[var(--text-input)] min-h-screen p-4 transition-colors duration-500">
      <div className="max-w-[400px] mx-auto lg:max-w-xl flex flex-col flex-grow">

        <div className="flex items-start justify-between pb-6">
          <p className="text-2xl font-bold">calc</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 cursor-pointer" onClick={toggleTheme}>
              <div className="text-[10px] tracking-widest uppercase">Theme</div>

              <div className="flex flex-col items-center">
                <div className="flex justify-between w-[60px] px-1 text-xs text-[var(--text-input)] mb-1">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                </div>

                <div className="w-[60px] h-6 rounded-full bg-[var(--bg-toggle)] relative">
                  <div
                    className="w-4 h-4 rounded-full bg-[var(--key-bg-accent)] absolute top-1 transition-all"
                    style={{ left: `${themeIndex * 20}px` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[100px] md:h-[120px] bg-[var(--bg-screen)] rounded-xl flex items-center justify-end mb-6 px-4">
          <p className="text-5xl text-[var(--text-input)] pr-4 break-all whitespace-nowrap ">
            {lastEvaluated && !isNaN(Number(expression  ))
              ? formatNumberWithCommas(expression)
              : expression || '0'}
          </p>
        </div>

        <div className="bg-[var(--bg-toggle)] rounded-xl grid grid-cols-4 gap-4 px-6 py-8">
          {buttons.map((val, i) => (
            <button
              key={i}
              className={`btn
                ${val === 'del' || val === 'reset' ? 'btn-accent-1 uppercase' : ''}
                ${val === '=' ? 'btn-accent-2 btn-equal' : ''}
                ${(val === 'reset' || val === '=') ? 'col-span-2 h-[56px] btn-wide' : ''}
              `}
              onClick={() => handleInput(val)}
            >
              {val}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
