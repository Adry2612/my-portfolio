'use client';

import React, { useEffect, useState } from 'react';

import ComputerIcon from './icons/ComputerIcon';
import MobileIcon from './icons/MobileIcon';
import { ProyectType } from './_types';

import Proyect from './Proyect';
import ProyectSkeleton from './skeleton/ProyectSkeleton';
import SelectionButton from './animation/SelectionButton';

const PAGE_SIZE = 4;

const categories = [
  {
    name: 'Web',
    category: 'web',
    icon: <ComputerIcon />,
  },
  {
    name: 'Multiplataforma',
    category: 'mobile',
    icon: <MobileIcon />,
  },
];

export default function ProyectFilter({
  proyects,
}: {
  proyects: ProyectType[];
}) {
  const [active, setActive] = useState<string>('web');

  const [filteredProyects, setFilteredProyects] = useState<ProyectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [slidePosition, setSlidePosition] = useState({
    width: 0,
    left: 0,
    opacity: 0,
  });

  useEffect(() => {
    const toTime = (date?: string) => {
      const [day, month, year] = String(date || '').split('/').map(Number);
      return year ? new Date(year, (month || 1) - 1, day || 1).getTime() : 0;
    };
    const filteredResults = proyects
      .filter((proyect: ProyectType) => proyect.type === active)
      .sort((a, b) => toTime(b.date) - toTime(a.date));

    setFilteredProyects(filteredResults);
    setIsLoading(false);
    setPage(0);
  }, [active, proyects, isLoading, setFilteredProyects]);

  const totalPages = Math.ceil(filteredProyects.length / PAGE_SIZE);
  const paginatedProyects = filteredProyects.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );

  return (
    <>
      <div className='filters-row'>
        <div
          className='filter-slider'
          style={{
            transform: `translateX(${slidePosition.left}px)`,
            width: slidePosition.width,
            opacity: slidePosition.opacity,
          }}
        />
        {categories.map((category) => (
          <SelectionButton
            key={category.category}
            category={category}
            active={active}
            setActive={setActive}
            setSlidePosition={setSlidePosition}
          />
        ))}
      </div>

      <div className='projects-grid'>
        {isLoading ?
          <ProyectSkeleton />
        : (
          <>
            {paginatedProyects.map((proyect: ProyectType, index) => (
              <div
                key={proyect._id}
                className='project-card-entrance'
                style={{ animationDelay: `${0.08 * index}s` }}
              >
                <Proyect proyect={proyect} />
              </div>
            ))}
            {Array.from({
              length: Math.max(0, PAGE_SIZE - paginatedProyects.length),
            }).map((_, index) => (
              <div
                key={`project-placeholder-${index}`}
                className='project-card project-card-placeholder'
                aria-hidden='true'
              />
            ))}
          </>
        )
        }
      </div>

      {!isLoading && totalPages > 1 && (
        <div className='projects-pagination'>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type='button'
              className={`projects-pagination-page ${page === index ? 'projects-pagination-page-active' : ''}`}
              onClick={() => setPage(index)}
              aria-label={`Ir a la página ${index + 1}`}
              aria-current={page === index}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
