'use client';

import { useEffect, useState } from 'react';

export default function ThemeButton() {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkTheme);
  }, [darkTheme]);

  return (
    <button
      onClick={() => setDarkTheme((isDark) => !isDark)}
      className={`theme-toggle ${darkTheme ? 'theme-toggle-dark' : ''}`}
      type='button'
      title={darkTheme ? 'Activar modo claro' : 'Activar modo oscuro'}
      aria-label={darkTheme ? 'Activar modo claro' : 'Activar modo oscuro'}
      aria-pressed={darkTheme}
    >
      <svg
        viewBox='0 0 24 24'
        width='20'
        height='20'
        fill='none'
        aria-hidden='true'
        focusable='false'
      >
        <circle
          cx='12'
          cy='12'
          r='5'
          fill='currentColor'
        />
        <g
          className='theme-toggle-rays'
          stroke='currentColor'
          strokeWidth='1.6'
          strokeLinecap='round'
        >
          <line
            x1='12'
            y1='1.5'
            x2='12'
            y2='4'
          />
          <line
            x1='12'
            y1='20'
            x2='12'
            y2='22.5'
          />
          <line
            x1='1.5'
            y1='12'
            x2='4'
            y2='12'
          />
          <line
            x1='20'
            y1='12'
            x2='22.5'
            y2='12'
          />
          <line
            x1='4.2'
            y1='4.2'
            x2='5.9'
            y2='5.9'
          />
          <line
            x1='18.1'
            y1='18.1'
            x2='19.8'
            y2='19.8'
          />
          <line
            x1='4.2'
            y1='19.8'
            x2='5.9'
            y2='18.1'
          />
          <line
            x1='18.1'
            y1='5.9'
            x2='19.8'
            y2='4.2'
          />
        </g>
      </svg>
    </button>
  );
}
