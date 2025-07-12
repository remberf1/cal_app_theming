import { useEffect, useState } from 'react';

function App() {
  const [themeIndex, setThemeIndex] = useState(0);
  const themes = ['theme1', 'theme2', 'theme3'];

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...themes);
    root.classList.add(themes[themeIndex]);
  }, [themeIndex]);

  const toggleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  return (
    <div className="bg-[var(--bg-main)] text-[var(--text-input)] min-h-screen p-4 ">
      <div className='max-w-[400px] mx-auto lg:max-w-xl'>

      <div className="flex items-start justify-between pb-6">
        <p className="text-2xl">calc</p>

        <div className="flex items-center gap-4">
          {/* Theme switch label and switch */}
          <div className="flex items-center gap-4">
            {/* Label */}
            <div className="text-[10px] tracking-widest uppercase">Theme</div>

            {/* Switch block */}
            <div className="flex flex-col items-center">
              {/* Numbers above switch */}
              <div className="flex justify-between w-[60px] px-1 text-xs text-[var(--text-input)] mb-1">
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </div>

              {/* Switch */}
              <div
                onClick={toggleTheme}
                className="w-[60px] h-6 rounded-full bg-[var(--bg-toggle)] relative cursor-pointer"
              >
                <div
                  className="w-4 h-4 rounded-full bg-[var(--key-bg-accent)] absolute top-1 transition-all"
                  style={{ left: `${themeIndex * 20}px` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex-1 min-h-[100px] bg-[var(--bg-screen)] rounded-xl flex items-center justify-end mb-6 '>
        <p className='text-5xl text-[var(--text-input)] pr-4'>kl99</p>
      </div>
      <div className='bg-[var(--bg-toggle)] rounded-xl grid grid-cols-4 gap-4 px-6 py-8'>
       <button className="btn ">7</button>
       <button className="btn ">8</button>
       <button className="btn ">9</button>
       <button className="btn btn-accent-1 uppercase">del</button>

       <button className="btn ">4</button>
       <button className="btn ">5</button>
       <button className="btn ">6</button>
       <button className="btn ">+</button>

       <button className="btn ">1</button>
       <button className="btn ">2</button>
       <button className="btn ">3</button>
       <button className="btn ">-</button>

       <button className="btn ">.</button>
       <button className="btn ">0</button>
       <button className="btn ">/</button>
       <button className="btn">x</button>

       <button className=' h-[14] btn btn-accent-1 uppercase btn-wide'>Reset</button>
       <button className='h-[14] btn-accent-2 btn-wide btn-equal'>=</button>
      </div>
      </div>
    </div>
  );
}

export default App;
