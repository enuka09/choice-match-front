import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { DropdownProps } from "./types/interface";
import { Link } from "react-router-dom";

const Dropdown: React.FC<DropdownProps> = ({ trigger, options }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {trigger}
        <ChevronDownIcon className={`ml-2 h-3.5 w-3.5 transform ${isOpen ? "rotate-180" : ""}`} />
      </div>
      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="dropdownHover"
          className="absolute left-0 z-10 w-44  rounded-lg bg-neutral-500"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="hidden"></div>
          <ul className="py-2 text-sm text-neutral-300 " aria-labelledby="dropdownHoverButton">
            {options.map((option, index) => (
              <li key={index}>
                <Link to="#" className=":hover:text-white block px-4 py-2 hover:bg-neutral-100">
                  {option}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
