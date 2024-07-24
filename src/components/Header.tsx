'use client';
import Image from 'next/image'
import { Link } from 'react-scroll'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import AdrianLogo from '/public/logo.png'

export default function Header() {
  const [menuState, setMenuState] = useState<boolean>(true);

  function handleOpenMenu(isOpen: boolean) {
    return setMenuState(!isOpen);
  }

  return (
    <header className='flex flex-col items-center justify-around w-full mx-auto transition-all duration-200 ease-in-out transform rounded-lg shadow-lg opacity-75 md:flex-row md:w-3/4 shadow-neutral-500'>
      <div className='flex flex-row items-center justify-around w-full md:w-1/3'>
        <div className='relative w-20 h-20'>
          <Image src={AdrianLogo} alt="Logo de Adrián" objectFit='cover' layout='fill' />
        </div>
        {menuState
          ? (
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => handleOpenMenu(menuState)}
              className='text-red-400 w-[2rem] h-[2rem] md:hidden' />
          )
          : (
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => handleOpenMenu(menuState)}
              className='text-red-400 w-[2rem] h-[2rem] md:hidden' />
          )}
      </div>

      <div className={`${menuState ? '-translate-y-52 fixed md:relative bg-transparent' : ''} items-center justify-center md:justify-around p-1 flex-col md:flex-row flex text-lg md:-translate-y-0 text-adriPink`} id="menu">
        <Link to="treyectoria" spy={true} offset={0} smooth={true} duration={800} className="p-2 rounded-md cursor-pointer hover:bg-adriPink hover:text-white" onClick={() => handleOpenMenu(menuState)}> Trayectoria </Link>
        <Link to="proyectos" spy={true} offset={0} smooth={true} duration={800} className="p-2 rounded-md cursor-pointer hover:bg-adriPink hover:text-white" onClick={() => handleOpenMenu(menuState)}> Proyectos</Link>
        <Link to="tecnologias" spy={true} offset={0} smooth={true} duration={800} className="p-2 rounded-md cursor-pointer hover:bg-adriPink hover:text-white" onClick={() => handleOpenMenu(menuState)}> Tecnologías </Link>
        <Link to="sobremi" spy={true} offset={0} smooth={true} duration={800} className="p-2 rounded-md cursor-pointer hover:bg-adriPink hover:text-white" onClick={() => handleOpenMenu(menuState)}> Sobre mi</Link>
      </div>
    </header >
  )
}
