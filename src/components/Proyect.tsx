'use client'

import { useState } from 'react';
import Image from "next/image";
import { ProyectType } from './_types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';

export default function Proyect({ proyect }: { proyect: ProyectType }) {
  const [accordion, setAccordion] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const openAccordion = () => {
    return setAccordion(prev => !prev);
  }

  return (
    <>
      <div className={`shadow-lg shadow-neutral-400 relative cursor-pointer rounded-lg h-56 transform duration-300 dark:shadow-md hover:-translate-y-2 ${accordion ? 'mb-40 ' : 'mb-0'}`} onClick={openAccordion}>

        <Image src={`/proyect-images/${proyect.img}`}
          layout='fill'
          objectFit='cover'
          alt=""
          onLoadingComplete={() => setIsLoading(false)}
          style={{
            opacity: isLoading ? 0 : 1,
            transition: 'opacity .5s ease-in-out'
          }}
          className={`rounded-lg z-10`}
        />

        <div
          style={{
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 2s ease-in-out'
          }}
          className={`${accordion ? 'translate-y-44' : ''}bg-adriPink h-56 overflow-hidden flex justify-center items-center flex-col rounded-lg transform transition-transform duration-500 ease-in-out z-20 mb-4 shadow-lg shadow-neutral-400 dark:shadow-lg`}>
          <h1 className='text-3xl font-bold text-white'> {proyect.name} </h1>

          <div className='flex gap-2 mt-2 links'>
            {proyect.deploy_url && (
              <a href={proyect.deploy_url} className='p-3 text-sm text-white rounded-lg bg-adriPinkDark hover:bg-white z-1 h-full hover:text-adriPinkDark'>
                <FontAwesomeIcon icon={faArrowPointer} /> Ver despliegue
              </a>
            )}
            <a className='p-3 text-white rounded-lg bg-adriPinkDark z-1 hover:bg-white hover:text-adriPinkDark'>
              <FontAwesomeIcon icon={faGithub} /> Ver repositorio
            </a>
          </div>

          <span />

          <div className='labels'>
          </div>
        </div>
      </div>
    </>
  )
}
