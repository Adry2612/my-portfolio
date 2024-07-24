'use client'

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'

export default function ThemeButton() {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkTheme])

  function handleClicked(mode: boolean) {
    setDarkTheme(!mode);
  }

  return (
    <button
      onClick={() => handleClicked(darkTheme)}
      className="fixed flex items-center justify-center w-16 h-16 p-5 text-white bg-red-500 rounded-full cursor-pointer theme-toggle right-5 bottom-3"
      type="button"
      title="Toggle theme"
      aria-label="Toggle theme"
    >
      {
        darkTheme ? (
          <FontAwesomeIcon icon={faSun} className='w-5 h-5' />
        ) : (
          <FontAwesomeIcon icon={faMoon} className='w-5 h-5' />
        )}
    </button>
  )
}
