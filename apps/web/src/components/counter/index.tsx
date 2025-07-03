import React, { ChangeEvent, useState, useEffect } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

type CounterProps = {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
};

export function Counter({
  initialValue = 0,
  min = 0,
  max = Infinity,
  step = 1,
  onChange,
}: CounterProps) {
  const [count, setCount] = useState(initialValue);
  useEffect(() => {
    onChange?.(count);
  }, [count, onChange]);

  const handleIncrement = () => {
    setCount((prev) => {
      const newValue = prev + step;
      return newValue > max ? prev : newValue;
    });
  };

  const handleDecrement = () => {
    setCount((prev) => {
      const newValue = prev - step;
      return newValue < min ? prev : newValue;
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value === "") {
      setCount(min);
      return;
    }

    const numValue = parseInt(value, 10);
    
    if (!isNaN(numValue)) {
      if (numValue >= min && numValue <= max) {
        setCount(numValue);
      } else if (numValue < min) {
        setCount(min);
      } else if (numValue > max) {
        setCount(max);
      }
    }
  };

  return (
    <div className="counter-wrapper">
      <button 
        onClick={handleDecrement} 
        disabled={count <= min}
        aria-label="Decrease"
      >
        <BiMinus />
      </button>
      
      <input
        type="number"
        value={count}
        onChange={handleInputChange}
        className="counter-input"
        min={min}
        max={max}
        step={step}
      />
      
      <button 
        onClick={handleIncrement} 
        disabled={count >= max}
        aria-label="Increase"
      >
        <BiPlus />
      </button>
    </div>
  );
}