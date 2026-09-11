"use client"

import { useRef, type JSX } from "react";

interface CategoryType {
  category: string;
  name: string,
  icon: JSX.Element;
}

interface SelectionButtonProps {
  category: CategoryType;
  active: string;
  setActive: (name: string) => void;
  setSlidePosition: (slidePosition: { width: number, left: number, opacity: number }) => void;
}

const SelectionButton: React.FC<SelectionButtonProps> = ({ category, active, setActive, setSlidePosition }) => {
  const ref = useRef<HTMLButtonElement>(null);
  
  return (
    <button
      ref={ref}
      onClick={() => {
        setActive(category.category);
        if (!ref.current) return;
        const {width} = ref.current.getBoundingClientRect();

        setSlidePosition({
          width,
          left: ref.current.offsetLeft,
          opacity: 1
        });
      }}
      className={`filter-button ${active === category.category ? 'filter-button-active' : ''}`}
    >
      {category.icon}
      {category.name}
    </button>
  );
};

export default SelectionButton;