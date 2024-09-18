'use client';

import React, { useEffect, useState } from 'react'
import BackIcon from './icons/BackIcon'
import ComputerIcon from './icons/ComputerIcon'
import LighningIcon from './icons/LighningIcon'
import Image from 'next/image'
import { TechnologyType } from './_types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faMobileButton } from '@fortawesome/free-solid-svg-icons';

export default function TechnologiesFilter({ technologies }: { technologies: TechnologyType[] }) {
  const [active, setActive] = useState<string>('main');
  const [isLoading, setIsLoading] = useState(true)
  const [filteredTechnologies, setFilteredTechnologies] = useState<TechnologyType[]>([]);

  useEffect(() => {
    const filteredResults = technologies.filter((tech: TechnologyType) => tech.category.includes(active));

    setFilteredTechnologies(filteredResults);
    setIsLoading(false)
  }, [active, technologies, setFilteredTechnologies]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 shrink-1">
        <button
          onClick={() => setActive('main')}
          className={`${active === 'main' ? 'bg-adriPink text-white' : 'bg-gray-200 text-black'}  py-2 px-5 rounded-lg flex items-center justify-evenly gap-1`}>
          <LighningIcon />
          Main Stack
        </button>
        <button
          onClick={() => setActive('front')}
          className={`${active === 'front' ? 'bg-adriPink text-white' : 'bg-gray-200 text-black'}  py-2 px-5 rounded-lg flex items-center justify-evenly gap-1`}>
          <ComputerIcon />
          Frontend
        </button>
        <button
          onClick={() => setActive('back')}
          className={`${active === 'back' ? 'bg-adriPink text-white' : 'bg-gray-200 text-black'}  py-2 px-5 rounded-lg flex items-center justify-evenly gap-1`}>
          <BackIcon />
          Backend
        </button>
        <button onClick={() => setActive('others')}
          className={`${active === 'others' ? 'bg-adriPink text-white' : 'bg-gray-200 text-black'}  py-2 px-5 rounded-lg flex items-center justify-evenly gap-1`}>
          <FontAwesomeIcon icon={faMobileAlt} />
          Otros
        </button>
      </div>

      <div className="flex flex-row flex-wrap items-center justify-center w-2/3 m-6 gap-5">
        {
          isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="relative flex items-center justify-center w-48 p-4 px-1 py-2  animate-pulse overflow-hidden bg-blue-400 rounded-2xl bg-opacity-5 hover:border hover:bg-opacity-10 h-14"
              >
                <span className="absolute text-xl bottom-2 left-3 leading-5 w-[80px] h-[10px] bg-neutral-400 rounded-sm" />
                <span className="absolute -top-2 right-5 opacity-30 w-[40px] h-[40px] bg-neutral-400" />
              </div>
            ))
          ) : (
            filteredTechnologies.map((tech: TechnologyType) => (
              <div
                key={tech.id}
                className="relative flex items-center justify-center w-48 p-4 px-1 py-2 overflow-hidden bg-blue-400 rounded-2xl bg-opacity-5 hover:border hover:bg-opacity-10 h-14"
              >
                <p className="absolute text-xl bottom-1 left-3 max-w-10 leading-5">
                  {tech.name}
                </p>
                <Image
                  src={`/tecnology-icons/${tech.icon}`}
                  width={40}
                  height={40}
                  className="absolute -top-2 right-5 opacity-30"
                  alt={tech.name}
                />
              </div>
            ))
          )
        }
      </div>
    </>
  )
} 
