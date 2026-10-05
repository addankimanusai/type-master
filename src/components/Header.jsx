import React from 'react';
import ThemeToggle from './ThemeToggle';
import { FaKeyboard } from 'react-icons/fa';

function Header({ theme, toggleTheme, currentView, setCurrentView, setActiveLessonId }) {
  return (
    <header className="app-header">
      <div className="logo-container" onClick={() => setCurrentView('home')} style={{ cursor: 'pointer' }}>
        <FaKeyboard className="logo-icon" />
        <div className="logo-text">
          <h1>TYPEMASTER</h1>
          <p>Touch Typing Practice</p>
        </div>
      </div>
      <div className="header-actions">
        <nav className="header-nav">
          <button className={`nav-btn ${currentView === 'home' ? 'active' : ''}`} onClick={() => { setCurrentView('home'); setActiveLessonId(null); }}>Practice</button>
          <button className={`nav-btn ${currentView === 'lessons' ? 'active' : ''}`} onClick={() => setCurrentView('lessons')}>Lessons</button>
          <button className={`nav-btn ${currentView === 'guide' ? 'active' : ''}`} onClick={() => setCurrentView('guide')}>Guide</button>
          <button className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')}>Dashboard</button>
          <button className={`nav-btn ${currentView === 'settings' ? 'active' : ''}`} onClick={() => setCurrentView('settings')}>Settings</button>
        </nav>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
}

export default Header;
