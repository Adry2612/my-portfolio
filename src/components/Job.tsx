'use client';

import Image from 'next/image';
import { JobType } from './_types';
import { useState } from 'react';

export default function Job({ job, index }: { job: JobType; index: number }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div
      className='job-row job-entrance'
      style={{ animationDelay: `${0.12 * index}s` }}
    >
      <Image
        src={`/job-icons/${job.icon}`}
        alt={job.name}
        onLoad={() => setIsLoading(false)}
        style={{
          objectFit: 'contain',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
        }}
        width={150}
        height={150}
        className='job-icon'
      />
      <div className='job-content'>
        <div className='job-title-line'>
          <h2> {job.description} </h2>
          <span> / </span>
          <h3> {job.name}</h3>
        </div>
        <div className='job-date'>
          <h3>
            {' '}
            {job.startDate} - {job.endDate}{' '}
          </h3>
        </div>
        <div className='job-tech-wrap'>
          <ol className='job-tech-list'>
            {job.tecnologies.map((tecnology) => (
              <li key={tecnology}> {tecnology} </li>
            ))}
          </ol>
        </div>
        <div className='job-details'>
          <ul>
            {job.thingsDone &&
              job.thingsDone.map((text) => <li key={text}> {text} </li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
