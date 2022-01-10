import React from 'react';

export const Input: React.FC<{
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  setValue: (e: any) => any;
}> = ({ name, type = 'text', placeholder, value, error, setValue }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-sm font-bold mb-2 text-teal-500"
        htmlFor="email"
      >
        {name}
      </label>
      {type === 'textarea' ? (
        <textarea
          rows={3}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline resize-none ${
            error && `border-red-500`
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
        />
      ) : (
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
            error && 'border-red-500'
          }`}
          id={placeholder}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
        />
      )}
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};
