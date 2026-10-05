import React, { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../utils/storage';

function Settings() {
  const [settings, setSettingsState] = useState(getSettings());

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const toggleSound = () => setSettingsState(s => ({ ...s, soundEnabled: !s.soundEnabled }));
  const toggleAnimations = () => setSettingsState(s => ({ ...s, animationsEnabled: !s.animationsEnabled }));
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset ALL data? This will permanently remove your practice history, personal best, achievements, and preferences. This action cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="dashboard-screen settings-screen">
      <h2>SETTINGS</h2>
      
      <div className="settings-section">
        <div className="setting-item">
          <div className="setting-info">
            <h4>Sound Effects</h4>
            <p>Play a sound when you press a key or unlock an achievement.</p>
          </div>
          <button 
            className={`toggle-btn ${settings.soundEnabled ? 'active' : ''}`}
            onClick={toggleSound}
          >
            {settings.soundEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Keyboard Animations</h4>
            <p>Show animations when pressing keys on the virtual keyboard.</p>
          </div>
          <button 
            className={`toggle-btn ${settings.animationsEnabled ? 'active' : ''}`}
            onClick={toggleAnimations}
          >
            {settings.animationsEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="settings-section danger-zone">
        <h4>Danger Zone</h4>
        <p>This action cannot be undone.</p>
        <button className="primary-btn danger-btn" onClick={handleReset}>
          RESET ALL DATA
        </button>
      </div>
    </div>
  );
}

export default Settings;
