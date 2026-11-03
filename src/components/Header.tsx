'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import AnimatedNavMenu from './animation/AnimatedNavMenu';
import ArrowUpRightIcon from './icons/ArrowUpRightIcon';

export default function Header() {
  const [hidden, setHidden] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    let previousY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > previousY && currentY > 120);
      previousY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 765) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav
      className={`portfolio-nav ${hidden ? 'portfolio-nav-hidden' : ''}`}
    >
      <div className='nav-brand'>
        <Image
          width={180}
          height={50}
          src='/logo.png'
          alt='Logo de Adrián Vidal'
          className='brand-mark'
          sizes='30px'
          priority
        />
        <span>
          Adrián Vidal<span className='brand-period'>.</span>
        </span>
      </div>
      <AnimatedNavMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div
        className={`${isOpen ? 'nav-links nav-links-open' : 'nav-links'}`}
        id='menu'
      >
        <a
          href='#treyectoria'
          className='nav-link'
        >
          Trayectoria
        </a>
        <a
          href='#proyectos'
          className='nav-link'
        >
          Proyectos
        </a>
        <a
          href='#tecnologias'
          className='nav-link'
        >
          Stack
        </a>
        <a
          href='#sobremi'
          className='nav-link nav-contact'
        >
          Hablemos <ArrowUpRightIcon />
        </a>
      </div>
    </nav>
  );
}
