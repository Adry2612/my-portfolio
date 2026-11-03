import React from 'react';
import CaseIcon from './icons/CaseIcon';
import ChecklistIcon from './icons/ChecklistIcon';

export default function Timelife() {
  return (
    <>
      <div className='stats-row'>
        <div className='stat-item'>
          <CaseIcon />
          <h2>+ 5 años</h2>
          <h1>Experiencia</h1>
        </div>
        <div className='stat-item'>
          <ChecklistIcon />
          <h2>4</h2>
          <h1>Productos propios</h1>
        </div>
      </div>
    </>
  );
}
