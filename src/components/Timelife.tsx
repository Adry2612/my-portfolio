import React from 'react'
import CaseIcon from './icons/CaseIcon'
import CalendarIcon from './icons/CalendarIcon'
import ProyectsIcon from './icons/ProyectsIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck } from '@fortawesome/free-solid-svg-icons'

export default function Timelife() {
  return (
    <>
      <div className='flex flex-col items-center w-2/4 gap-4 md:flex-row md:items-between justify-evenly dark:text-white'>
        <div className='border border-gray-200 rounded-lg p-5 w-[13rem]'>
          <CalendarIcon />
          <h2 className='mt-2 text-xl font-bold text-gray-400 whitespace-nowrap'> 26 años</h2>
          <h1 className='-mt-2 text-2xl font-bold text-gray-600 dark:text-white'> Edad </h1>
        </div>
        <div className='border border-gray-200 rounded-lg p-5 w-[13rem]'>
          <CaseIcon />
          <h2 className='mt-2 text-xl font-bold text-gray-400'> + 4 años </h2>
          <h1 className='-mt-2 text-2xl font-bold text-gray-600 dark:text-white'> Experiencia </h1>
        </div>
        <div className='border border-gray-200 rounded-lg p-5 w-[13rem]'>
          <FontAwesomeIcon icon={faListCheck} className="w-10 h-10 text-adriPink" />
          <h2 className='mt-2 text-xl font-bold text-gray-400'> + 10 </h2>
          <h1 className='-mt-2 text-2xl font-bold text-gray-600 dark:text-white'> Proyectos </h1>
        </div>
      </div>
    </>
  )
}
