'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ThemeButton() {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkTheme);
  }, [darkTheme]);

  return (
    <button
      onClick={() => setDarkTheme((isDark) => !isDark)}
      className='theme-toggle'
      type='button'
      title={darkTheme ? 'Activar modo claro' : 'Activar modo oscuro'}
      aria-label={darkTheme ? 'Activar modo claro' : 'Activar modo oscuro'}
      aria-pressed={darkTheme}
    >
      <motion.svg
        viewBox='0 0 24 24'
        width='20'
        height='20'
        fill='none'
        animate={{ rotate: darkTheme ? -110 : 0 }}
        transition={{ type: 'spring', stiffness: 140, damping: 16 }}
      >
        <mask id='theme-toggle-mask'>
          <rect
            x='0'
            y='0'
            width='24'
            height='24'
            fill='#fff'
          />
          {/* sliding cutout turns the disc into a crescent, independent of background color */}
          <motion.circle
            r='4.2'
            fill='#000'
            animate={{ cx: darkTheme ? 8 : 26, cy: darkTheme ? 7.5 : -6 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          />
        </mask>
        <motion.circle
          cx='12'
          cy='12'
          r='5'
          fill='currentColor'
          mask='url(#theme-toggle-mask)'
          animate={{ scale: darkTheme ? 0.92 : 1 }}
          style={{ transformOrigin: '12px 12px' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
        <motion.g
          stroke='currentColor'
          strokeWidth='1.6'
          strokeLinecap='round'
          animate={{ opacity: darkTheme ? 0 : 1, scale: darkTheme ? 0.5 : 1 }}
          style={{ transformOrigin: '12px 12px' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
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
        </motion.g>
      </motion.svg>
    </button>
  );
}
