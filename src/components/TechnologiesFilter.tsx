'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import BackIcon from './icons/BackIcon';
import ComputerIcon from './icons/ComputerIcon';
import LighningIcon from './icons/LighningIcon';
import SelectionButton from './animation/SelectionButton';
import { TechnologyType } from './_types';

import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { SatoshiRegular } from '@/app/fonts';

export default function TechnologiesFilter({
  technologies,
}: {
  technologies: TechnologyType[];
}) {
  const [active, setActive] = useState<string>('main');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredTechnologies, setFilteredTechnologies] = useState<
    TechnologyType[]
  >([]);

  const [slidePosition, setSlidePosition] = useState({
    width: 0,
    left: 0,
    opacity: 0,
  });

  const categories = [
    {
      name: 'Main Stack',
      category: 'main',
      icon: <LighningIcon />,
    },
    {
      name: 'Front',
      category: 'front',
      icon: <ComputerIcon />,
    },
    {
      name: 'Back',
      category: 'back',
      icon: <BackIcon />,
    },
    {
      name: 'Otros',
      category: 'others',
      icon: <FontAwesomeIcon icon={faMobileAlt} />,
    },
  ];

  useEffect(() => {
    const filteredResults = technologies.filter((tech: TechnologyType) =>
      tech.category.includes(active)
    );
    setFilteredTechnologies(filteredResults);
    setIsLoading(false);
  }, [active, technologies]);

  return (
    <>
      <div className='relative flex flex-wrap justify-center gap-2 shrink-1'>
        {categories.map((category, index) => (
          <SelectionButton
            category={category}
            active={active}
            setActive={setActive}
            setSlidePosition={setSlidePosition}
          />
        ))}

        <motion.div
          layout
          className='absolute top-0 hidden md:block left-0 z-0 h-full mx-auto rounded-lg w-fit bg-adriPink'
          animate={{
            x: slidePosition.left,
            width: slidePosition.width,
            opacity: slidePosition.opacity,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ width: '50%'}}
        />
      </div>

      <motion.div
        className='flex flex-row flex-wrap items-center justify-center w-2/3 gap-5 m-6'
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className='relative flex items-center justify-center w-48 p-4 px-1 py-2 overflow-hidden bg-blue-400 animate-pulse rounded-2xl bg-opacity-5 hover:border hover:bg-opacity-10 h-14'
              >
                <span className='absolute text-xl bottom-2 left-3 leading-5 w-[80px] h-[10px] bg-neutral-400 rounded-sm' />
                <span className='absolute -top-2 right-5 opacity-30 w-[40px] h-[40px] bg-neutral-400' />
              </div>
            ))
          : filteredTechnologies.map((tech: TechnologyType, index) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                  delay: 0.1 * index,
                }}
                className={`relative flex items-center justify-center w-48 p-4 px-1 py-2 overflow-hidden bg-blue-400 rounded-2xl bg-opacity-5 hover:border hover:bg-opacity-10 h-14 ${SatoshiRegular.className}`}
              >
                <p className='absolute text-xl leading-5 bottom-1 left-3 max-w-10'>
                  {tech.name}
                </p>
                <Image
                  src={`/tecnology-icons/${tech.icon}`}
                  width={40}
                  height={40}
                  className='absolute -top-2 right-5 opacity-30'
                  alt={tech.name}
                />
              </motion.div>
            ))}
      </motion.div>
    </>
  );
}
