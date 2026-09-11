/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';
import { Link } from 'react-scroll';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useScroll } from 'framer-motion';
import { useMotionValueEvent } from 'framer-motion';
import AnimatedNavMenu from './animation/AnimatedNavMenu';
import { AnimatePresence } from 'framer-motion';

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useMotionValueEvent(scrollY, 'change', (latest: number) => {
    const previous = scrollY.getPrevious();
    latest > previous && latest > 120 ? setHidden(true) : setHidden(false);
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 765) {
        setIsOpen(false); // Cerrar el menú automáticamente
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Ejecutar al montar

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: '-150%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className='portfolio-nav'
    >
      <div className='nav-brand'>
        <Image
          width={180}
          height={50}
          src='/logo.png'
          alt='Logo de Adrián Vidal'
          className='brand-mark'
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

      <AnimatePresence>
        <motion.div
          key={isOpen}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className={`${isOpen ? 'nav-links nav-links-open' : 'nav-links'}`}
          id='menu'
        >
          <Link
            to='treyectoria'
            spy={true}
            offset={0}
            smooth={true}
            duration={800}
            className='nav-link'
          >
            {' '}
            Trayectoria{' '}
          </Link>
          <Link
            to='proyectos'
            spy={true}
            offset={0}
            smooth={true}
            duration={800}
            className='nav-link'
          >
            {' '}
            Proyectos
          </Link>
          <Link
            to='tecnologias'
            spy={true}
            offset={0}
            smooth={true}
            duration={800}
            className='nav-link'
          >
            {' '}
            Stack{' '}
          </Link>
          <Link
            to='sobremi'
            spy={true}
            offset={0}
            smooth={true}
            duration={800}
            className='nav-link nav-contact'
          >
            {' '}
            Hablemos ↗
          </Link>
        </motion.div>
      </AnimatePresence>
    </motion.nav>
  );
}
