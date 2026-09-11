import React from 'react';
import CaseIcon from './icons/CaseIcon';
import CalendarIcon from './icons/CalendarIcon';
import ProyectsIcon from './icons/ProyectsIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

export default function Timelife() {
  return (
    <>
      <div className='stats-row'>
        <div className='stat-item'>
          <CalendarIcon />
          <h2>27 años</h2>
          <h1>Edad</h1>
        </div>
        <div className='stat-item'>
          <CaseIcon />
          <h2>+ 5 años</h2>
          <h1>Experiencia</h1>
        </div>
        <div className='stat-item'>
          <FontAwesomeIcon
            icon={faListCheck}
            className='w-10 h-10 text-adriPink'
          />
          <h2>+ 10</h2>
          <h1>Proyectos</h1>
        </div>
      </div>
    </>
  );
}
