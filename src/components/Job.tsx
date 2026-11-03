'use client';

import { JobType } from './_types';
import { useState } from 'react';

// Variantes generadas con scripts/generate-image-variants.mjs.
const ICON_WIDTHS = [150, 300];

const iconSrc = (icon: string) =>
  /\.webp$/i.test(icon) ?
    `/job-icons/${icon.replace(/\.webp$/i, '-150.webp')}`
  : `/job-icons/${icon}`;

const iconSrcSet = (icon: string) =>
  /\.webp$/i.test(icon) ?
    ICON_WIDTHS.map(
      (width) =>
        `/job-icons/${icon.replace(/\.webp$/i, `-${width}.webp`)} ${width}w`,
    ).join(', ')
  : undefined;

export default function Job({ job, index }: { job: JobType; index: number }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div
      className='job-row job-entrance'
      style={{ animationDelay: `${0.12 * index}s` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- variantes pregeneradas en build con scripts/generate-image-variants.mjs */}
      <img
        src={iconSrc(job.icon)}
        srcSet={iconSrcSet(job.icon)}
        sizes='(max-width: 768px) 110px, 150px'
        alt={job.name}
        width={150}
        height={150}
        loading='lazy'
        decoding='async'
        onLoad={() => setIsLoading(false)}
        style={{
          objectFit: 'contain',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
        }}
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
