import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const CustomSlider = ({ min, max, step, onChange, currency }: any) => {
  const [values, setValues] = useState([min, max]);

  const handleMinChange = (e: any) => {
    const value = parseInt(e.target.value);
    setValues([value, Math.max(value, values[1])]);
  };

  const handleMaxChange = (e: any) => {
    const value = parseInt(e.target.value);
    setValues([Math.min(value, values[0]), value]);
  };

  const handleFilterClick = () => {
    onChange(values);
  };

  return (
    <div className="relative flex flex-col gap-3 lg:w-full sm:w-2/4 w-full">
      <div className="absolute flex justify-center items-center top-0 left-0 h-[0.6rem] w-full  dark:bg-white bg-[rgb(18,15,13)] rounded-full z-0 pointer-events-none" />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={values[0]}
        onChange={handleMinChange}
        className="absolute w-full z-10"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={values[1]}
        onChange={handleMaxChange}
        className="absolute w-full z-10"
      />

      <div className="flex  justify-between mt-5">
        <span>
          Min: {values[0]} {currency}{' '}
        </span>
        <span>
          Max: {values[1]} {currency}{' '}
        </span>
      </div>
      <Button
        onClick={handleFilterClick}
        className="rounded-none w-2/5"
        size={'sm'}
      >
        Filter
      </Button>
    </div>
  );
};

export default CustomSlider;
