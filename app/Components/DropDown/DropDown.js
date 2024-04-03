import React, { useEffect, useState } from 'react';

const Dropdown = ({options, indexOption = 0, setIndexOption = null, zIndex = '2', isTop=false}) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option, index) => {
    if(setIndexOption){
      setIndexOption(index);
    }
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (options.length > 0 && !selectedOption) {
      setSelectedOption(options[indexOption]);
    }
  }, []);

  return (
    <div className="dropdown" style={{ zIndex: zIndex }}>
      <button className="dropdown-toggle" onClick={handleToggleDropdown}>
        {selectedOption || options[indexOption]}
        <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.227 11h11.547c.862 0 1.32-1.02.747-1.665L12.748 2.84a.998.998 0 0 0-1.494 0L5.479 9.335C4.906 9.98 5.364 11 6.227 11zm5.026 10.159a.998.998 0 0 0 1.494 0l5.773-6.495c.574-.644.116-1.664-.747-1.664H6.227c-.862 0-1.32 1.02-.747 1.665l5.773 6.494z"/></svg>
      </button>
      {isOpen && (
        <ul className={`dropdown-menu ${isTop ? "top" : ""}`}>
          {options.map((option, index) => (
            <li
              key={index}
              className={selectedOption === option ? 'selected' : ''}
              onClick={() => handleOptionSelect(option, index)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;