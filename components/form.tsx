import React from 'react';

export const Toggle: React.FC<{
  id: string;
  name: string;
  value: boolean;
  setValue: (e: any) => any;
}> = ({ id, name, value, setValue }) => {
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <div className="ml-3 text-teal-500 font-semibold mr-2">{name}</div>
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          checked={value}
          onChange={() => setValue(!value)}
        />
        <div className="block bg-teal-500 w-14 h-8 rounded-full"></div>
        <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
      </div>
    </label>
  );
};

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
