import React from 'react'
import CaseIcon from './icons/CaseIcon'
import CalendarIcon from './icons/CalendarIcon'
import ProyectsIcon from './icons/ProyectsIcon'

export default function Timelife() {
  return (
    <>
      <div className='flex flex-col items-center w-2/4 md:flex-row md:items-between justify-evenly gap-4'>
        <div className='border border-gray-200 rounded-lg p-5 w-[10rem]'>
          <CalendarIcon />
          <h2 className='text-xl font-bold text-gray-400'> 25 años</h2>
          <h1 className='text-2xl font-bold text-gray-400'> Edad </h1>
        </div>
        <div className='border border-gray-200 rounded-lg p-5 w-[12rem]'>
          <CaseIcon />
          <h2 className='text-xl font-bold text-gray-400'> + 4 años </h2>
          <h1 className='text-2xl font-bold text-gray-400'> Experiencia </h1>
        </div>
        <div className='border border-gray-200 rounded-lg p-5 w-[13rem]'>
          <ProyectsIcon />
          <h2 className='text-xl font-bold text-gray-400'> + 10 </h2>
          <h1 className='text-2xl font-bold text-gray-400'> Proyectos </h1>
        </div>
      </div>
    </>
  )
}
