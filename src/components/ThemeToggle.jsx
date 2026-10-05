import React from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? (
        <>
          <MdDarkMode />
          <span>Dark Mode</span>
        </>
      ) : (
        <>
          <MdLightMode />
          <span>Light Mode</span>
        </>
      )}
    </button>
  );
}

export default ThemeToggle;
