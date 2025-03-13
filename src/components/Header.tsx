'use client';
import Image from 'next/image'
import { Link } from 'react-scroll'
import { useEffect, useState } from 'react'
import AdrianLogo from '/public/logo.png'
import { motion } from 'framer-motion';
import { useScroll } from 'framer-motion';
import { useMotionValueEvent } from 'framer-motion';
import AnimatedNavMenu from './animation/AnimatedNavMenu';
import { AnimatePresence } from 'framer-motion';

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    const previous = scrollY.getPrevious();
    latest > previous && latest > 120 ? setHidden(true) : setHidden(false); 
  })

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 765) {
        setIsOpen(false); // Cerrar el menú automáticamente
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Ejecutar al montar

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{duration: 0.3, ease: "easeInOut"}}
      className='sticky z-50 flex flex-col items-center justify-around w-full mx-auto transition-all ease-in-out transform bg-white rounded-lg shadow-lg opacity-100 dark:bg-transparent top-3 md:flex-row md:w-3/4 shadow-neutral-500 backdrop-blur-lg'>
      <div className='relative flex flex-row items-center justify-around w-full md:w-1/3'>
        <div className='relative w-20 h-20'>
          <Image src={AdrianLogo} alt="Logo de Adrián" objectFit='cover' layout='fill' />
        </div>
        <AnimatedNavMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>

      <AnimatePresence>
        <motion.div
          key={isOpen}
          initial={{scale: 0, opacity: 0}}
          animate={{scale: 1, opacity: 1}}
          exit={{scale: 0, opacity: 0}}
          transition={{duration: 0.8, type: "spring"}}
          className={`${isOpen ? "absolute -top-6 -right-6 sm:w-64 min-h-82 rounded-md bg-gray-100 p-8 pt-16 z-10 flex-col mx-16 my-8 flex " : "hidden" } items-center  justify-between p-1 md:flex flex-row text-lg text-adriPink origin-top-right`} id="menu"
        >
          <Link to="treyectoria" spy={true} offset={0} smooth={true} duration={800} className="p-2 rounded-md cursor-pointer hover:bg-adriPink hover:text-white" > Trayectoria </Link>
          <Link to="proyectos" spy={true} offset={0} smooth={true} duration={800} className="p-2 rounded-md cursor-pointer hover:bg-adriPink hover:text-white" > Proyectos</Link>
          <Link to="tecnologias" spy={true} offset={0} smooth={true} duration={800} className="p-2 rounded-md cursor-pointer hover:bg-adriPink hover:text-white" > Tecnologías </Link>
          <Link to="sobremi" spy={true} offset={0} smooth={true} duration={800} className="p-2 rounded-md cursor-pointer hover:bg-adriPink hover:text-white" > Sobre mi</Link>
        </motion.div>
      </AnimatePresence>
    </motion.nav >

  )
}
