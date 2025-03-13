"use client"

import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import React, { useEffect } from "react";

interface AnimatedNavMenuProps {
  isOpen: boolean;
  setIsOpen: (_: boolean) => void;
}

const AnimatedNavMenu: React.FC<AnimatedNavMenuProps> = ({ isOpen, setIsOpen }) => {
  const path1Control = useAnimation();
  const path2Control = useAnimation();
  const path3Control = useAnimation();
  
  const path1Variants = {
    open: { d: "M3.06061 2.99999L21.0606 21" },
    closed: { d: "M0 6L24 6" },
  };
  
  const path2Variants = {
    open: { d: "M3.00006 21.0607L21 3.06064" },
    closed: { d: "M0 18L24 18" },
  };
  
  const path3Variants = {
    open: { opacity: 0 },
    closed: { d: "M0 12L24 12", opacity: 1 },
  };

  useEffect(() => {
    if (isOpen) {
      path1Control.start(path1Variants.open);
      path2Control.start(path2Variants.open);
      path3Control.start(path3Variants.open);
    } else {
      path1Control.start(path1Variants.closed);
      path2Control.start(path2Variants.closed);
      path3Control.start(path3Variants.closed);
    }
  }, [isOpen])

  return (
    <div onClick={() => setIsOpen(!isOpen)}
      className="md:hidden cursor-pointer relative justify-self-center flex flex-col stroke-adriPink z-50 stroke-2 ">
      <svg width={24} height={24} viewBox="0 0 24 24"> 
      <motion.path {...path1Variants.closed} animate={path1Control} duration="0.2"/>
      <motion.path {...path2Variants.closed} animate={path2Control} duration="0.2"/>
      <motion.path {...path3Variants.closed} animate={path3Control} duration="0.2"/>
      </svg>
    </div>
  )
};

export default AnimatedNavMenu;