'use client';

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

import ComputerIcon from './icons/ComputerIcon'
import { ProyectType } from './_types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

import Proyect from './Proyect';
import ProyectSkeleton from './skeleton/ProyectSkeleton';
import SelectionButton from './animation/SelectionButton';


const categories = [
  {
    name: 'Web',
    category: 'web',
    icon: <ComputerIcon />
  },
  {
    name: 'Multiplataforma',
    category: 'mobile',
    icon: <FontAwesomeIcon icon={faMobileAlt} />
  },
];

export default function ProyectFilter({ proyects, main }: { proyects: ProyectType[], main?: boolean }) {
  const [active, setActive] = useState<string>('web');

  const [filteredProyects, setFilteredProyects] = useState<ProyectType[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [slidePosition, setSlidePosition] = useState({
    width: 0,
    left: 0,
    opacity: 0
  });

  useEffect(() => {
    const filteredResults = proyects.filter((proyect: ProyectType) => proyect.type === active);

    setFilteredProyects(filteredResults);
    setIsLoading(false);
  }, [active, proyects, isLoading, setFilteredProyects,]);

  return (
    <>
      <div className="flex flex-wrap justify-center w-50% shrink-1 relative gap-3">
        <motion.div
          layout
          className="absolute hidden md:block top-0 left-0 z-0 h-full mx-auto rounded-lg w-fit bg-adriPink"
          animate={{ x: slidePosition.left, width: slidePosition.width, opacity: slidePosition.opacity }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ width: "50%" }}
        />
        {categories.map((category, index) => (
          <SelectionButton category={category} active={active} setActive={setActive} setSlidePosition={setSlidePosition} />
        ))}
      </div>

      <div className="grid w-full gap-6 my-6 grid-col md:grid-flow-row md:grid-cols-2 lg:w-3/4">
        {
          isLoading ? (
            <ProyectSkeleton />
          ) : (
            filteredProyects.map((proyect: ProyectType, index) => (
                <motion.div
                  key={proyect._id}
                  initial={{ opacity: 0, y: 50}}
                  animate={{ opacity: 1, y: 0}}
                  transition={{ duration: 0.7, ease: "easeInOut", delay: 0.3 * index }}
                  threshold={0.5}>
                  <Proyect proyect={proyect} />
                </motion.div>
            )))
        }

      </div >
    </>
  )
} 
