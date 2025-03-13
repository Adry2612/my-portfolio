"use client"

import { useRef } from "react";

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
      className={`${active === category.category ? 'bg-adriPink text-white' : 'bg-gray-200 text-black'} relative z-10 py-2 px-5 rounded-lg flex items-center justify-evenly gap-1`}
    >
      {category.icon}
      {category.name}
    </button>
  );
};

export default SelectionButton;