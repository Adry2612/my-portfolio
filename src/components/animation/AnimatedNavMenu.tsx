'use client';

import React, { useEffect } from 'react';

interface AnimatedNavMenuProps {
  isOpen: boolean;
  setIsOpen: (_: boolean) => void;
}

const AnimatedNavMenu: React.FC<AnimatedNavMenuProps> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className='relative z-50 flex flex-col cursor-pointer stroke-2 md:hidden justify-self-center stroke-adriPink '
    >
      <span
        className={`menu-icon ${isOpen ? 'menu-icon-open' : ''}`}
        aria-hidden='true'
      >
        <i />
        <i />
        <i />
      </span>
    </div>
  );
};

export default AnimatedNavMenu;
