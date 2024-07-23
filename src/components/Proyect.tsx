'use client'

import { useState } from 'react';
import Image from "next/image";
import { ProyectType } from './_types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';

export default function Proyect({ proyect }: { proyect: ProyectType }) {
  const [accordion, setAccordion] = useState<boolean>(false);

  const openAccordion = () => {
    return setAccordion(prev => !prev);
  }

  return (
    <>
      <div className={`shadow-lg shadow-gray-400 relative cursor-pointer rounded-lg h-56 transform duration-300 dark:shadow-adriPink dark:shadow-md hover:-translate-y-2 ${accordion ? 'mb-40 ' : 'mb-0'}`} onClick={openAccordion}>
        <Image src={`/proyect-images/${proyect.img}`} layout='fill' objectFit='cover' alt="" className={` rounded-lg transform transition duration-700 ease-in-out z-10`} />

        <div className={`${accordion ? 'translate-y-44' : ''} bg-adriPink h-52 overflow-hidden flex justify-center items-center flex-col rounded-lg transform transition duration-500 ease-in-out z-20 mb-4 shadow-lg shadow-gray-200 dark:shadow-adriPink dark:shadow-md`}>
          <h1 className='text-3xl font-bold text-white'> {proyect.name} </h1>

          <div className='flex gap-2 mt-2 links'>
            <a href="" className='p-3 text-sm text-white rounded-lg bg-adriPinkDark'>
              <FontAwesomeIcon icon={faArrowPointer} /> Ver despliegue
            </a>
            <a className='p-3 text-white rounded-lg bg-adriPinkDark'>
              <FontAwesomeIcon icon={faGithub} /> Ver repositorio
            </a>
          </div>

          <span />

          <div className='labels'>
          </div>
        </div>
      </div >
    </>
  )
}
