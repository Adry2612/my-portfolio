'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import ComputerIcon from './icons/ComputerIcon';
import { ProyectType } from './_types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

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
    icon: <FontAwesomeIcon icon={faMobileAlt} />,
  },
];

export default function ProyectFilter({
  proyects,
  main,
}: {
  proyects: ProyectType[];
  main?: boolean;
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
    const filteredResults = proyects.filter(
      (proyect: ProyectType) => proyect.type === active,
    );

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
        <motion.div
          layout
          className='filter-slider'
          animate={{
            x: slidePosition.left,
            width: slidePosition.width,
            opacity: slidePosition.opacity,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ width: '50%' }}
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
        : paginatedProyects.map((proyect: ProyectType, index) => (
            <motion.div
              key={proyect._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: 'easeInOut',
                delay: 0.3 * index,
              }}
              threshold={0.5}
            >
              <Proyect proyect={proyect} />
            </motion.div>
          ))
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
