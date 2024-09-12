'use client';

import React, { useEffect, useState } from 'react'
import ComputerIcon from './icons/ComputerIcon'
import { ProyectType } from './_types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faMobileButton } from '@fortawesome/free-solid-svg-icons';
import Proyect from './Proyect';

export default function ProyectFilter({ proyects, main }: { proyects: ProyectType[], main?: boolean }) {
  const [active, setActive] = useState<string>('web');
  const [filteredProyects, setFilteredProyects] = useState<ProyectType[]>([]);

  useEffect(() => {
    const filteredResults = proyects.filter((proyect: ProyectType) => proyect.type === active);

    setFilteredProyects(filteredResults);
  }, [active, proyects, setFilteredProyects]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 shrink-1">
        <button
          onClick={() => setActive('web')}
          className={`${active === 'web' ? 'bg-adriPink text-white' : 'bg-gray-200 text-black'}  py-2 px-5 rounded-lg flex items-center justify-evenly gap-1`}>
          <ComputerIcon />
          Web
        </button>
        <button
          onClick={() => setActive('mobile')}
          className={`${active === 'mobile' ? 'bg-adriPink text-white' : 'bg-gray-200 text-black'}  py-2 px-5 rounded-lg flex items-center justify-evenly gap-1`}>
          <FontAwesomeIcon icon={faMobileAlt} />
          Multiplataforma
        </button>
      </div>

      <div className="grid w-full gap-6 my-6 grid-col md:grid-flow-row md:grid-cols-2 lg:w-3/4">
        {filteredProyects.map((proyect: ProyectType) => (
          <Proyect key={proyect._id} proyect={proyect} />
        ))}
      </div >
    </>
  )
} 
