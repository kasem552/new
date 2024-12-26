import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export function FormField({
  label,
  name,
  register,
  error,
  type = 'text',
  placeholder,
  required = false
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/90 mb-1">
        {label}{required && '*'}
      </label>
      <input
        type={type}
        {...register(name)}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        placeholder={placeholder}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error.message}</p>
      )}
    </div>
  );
}