import React from 'react';
import { toggleTheme } from '@utils/themeToggle';

const ThemeToggleButton: React.FC = () => {
  return (
    <button onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
};

export default ThemeToggleButton;
