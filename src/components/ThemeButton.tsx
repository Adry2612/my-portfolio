'use client'

import React, { useEffect, useState } from 'react'

export default function ThemeButton() {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    console.log('🚀 ~ file: ThemeButton.tsx:15 ~ ThemeButton ~ darkTheme:', darkTheme);
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        width="1em"
        height="1em"
        fill="currentColor"
        strokeLinecap="round"
        className="theme-toggle__classic"
        viewBox="0 0 32 32"
      >
        <clipPath id="theme-toggle__classic__cutout">
          <path d="M0-5h30a1 1 0 0 0 9 13v24H0Z" />
        </clipPath>
        <g clipPath="url(#theme-toggle__classic__cutout)">
          <circle cx="16" cy="16" r="9.34" />
          <g stroke="currentColor" strokeWidth="1.5">
            <path d="M16 5.5v-4" />
            <path d="M16 30.5v-4" />
            <path d="M1.5 16h4" />
            <path d="M26.5 16h4" />
            <path d="m23.4 8.6 2.8-2.8" />
            <path d="m5.7 26.3 2.9-2.9" />
            <path d="m5.8 5.8 2.8 2.8" />
            <path d="m23.4 23.4 2.9 2.9" />
          </g>
        </g>
      </svg>
    </button>
  )
}
