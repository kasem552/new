import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface SelectFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  options: string[];
  error?: FieldError;
  placeholder?: string;
  required?: boolean;
}

export function SelectField({
  label,
  name,
  register,
  options,
  error,
  placeholder,
  required = false
}: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/90 mb-1">
        {label}{required && '*'}
      </label>
      <div className="relative">
        <select
          {...register(name)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          <option value="" className="bg-primary text-white">
            {placeholder}
          </option>
          {options.map((option) => (
            <option 
              key={option} 
              value={option}
              className="bg-primary text-white"
            >
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg 
            className="w-5 h-5 text-white/70" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error.message}</p>
      )}
    </div>
  );
}