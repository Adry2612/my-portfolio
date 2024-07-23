'use client';
import Image from 'next/image'
import { Link } from 'react-scroll'
import React, { useState } from 'react'
import AdrianLogo from '/public/logo.png'

export default function Header() {
  const [menuState, setMenuState] = useState<boolean>(false);

  function handleOpenMenu(isOpen: boolean) {
    return setMenuState(!isOpen);
  }

  return (
    <header className='flex flex-col items-center justify-around w-full mx-auto mt-2 transition-all duration-200 ease-in-out transform rounded-lg shadow-lg opacity-75 md:flex-row md:w-3/4 shadow-neutral-500 dark:shadow-md dark:shadow-adriPink'>
      <div className='relative w-20 h-20'>
        <Image src={AdrianLogo} alt="Logo de Adrián" objectFit='cover' layout='fill' />
      </div>

      <div className={`${menuState ? '-translate-y-52 fixed bg-white' : '-translate-y-0'} items-center justify-center md:justify-around p-1 flex-col md:flex-row flex text-md text-adriPink`} id="menu">
        <Link to="treyectoria" spy={true} offset={0} smooth={true} duration={800} className="p-2 rounded-md cursor-pointer hover:bg-adriPink hover:text-white"> Trayectoria </Link>
        <Link to="proyectos" spy={true} offset={0} smooth={true} duration={800} className="p-2 rounded-md cursor-pointer hover:bg-adriPink hover:text-white"> Proyectos</Link>
        <Link to="tecnologias" spy={true} offset={0} smooth={true} duration={800} className="p-2 rounded-md cursor-pointer hover:bg-adriPink hover:text-white"> Tecnologías </Link>
        <Link to="sobremi" spy={true} offset={0} smooth={true} duration={800} className="p-2 rounded-md cursor-pointer hover:bg-adriPink hover:text-white"> Sobre mi</Link>
      </div>
    </header >
  )
}
