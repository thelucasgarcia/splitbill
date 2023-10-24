'use client'

import React from 'react';
import { useTheme } from 'next-themes';

const SelectTheme: React.FC = () => {
  const { theme, setTheme } = useTheme()
  return (
    <select
      className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
      name="theme"
      defaultValue={theme}
      onChange={data => setTheme(data.currentTarget.value)}
    >
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  );
}

export default SelectTheme;