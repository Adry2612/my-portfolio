// src/components/FadeInSection.tsx

"use client"; // Asegúrate de poner esto para que funcione en Next.js con React 18

import { motion } from "framer-motion";
import { useInView } from "framer-motion"; // Para detectar cuando el elemento entra en la vista
import { useRef } from "react";

const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;