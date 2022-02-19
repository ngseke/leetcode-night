import React, { useEffect, useState } from 'react';
import './Popup.css';
import capybaraImages from './images/capybara.png'
import gitHubLogo from './images/GitHub-Logo.png'
import './SwitchButton.css'
import { getIsEnabled } from '../../storage';

const { ENABLED_STORAGE_KEY } = require('../../constants')

export default function Popup() {
  const [isReady, setIsReady] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(function init() {
    getIsEnabled().then(isEnabled => {
      setIsEnabled(isEnabled)
      setIsReady(true)
    })
  }, [])

  useEffect(() => {
    if (!isReady) return
    chrome.storage.sync.set({ [ENABLED_STORAGE_KEY]: isEnabled })
  }, [isEnabled, isReady])

  return (
    <div className="App">
      <header className="App-header">
        <img src={capybaraImages} className={`App-logo ${isEnabled && 'horizontal-flip'}`} alt="logo" />
        <label className="switch">
          <input onClick={() => setIsEnabled(state => !state)} type="checkbox" checked={isEnabled} />
          <span className="slider round"></span>
        </label>
        <a
          className="App-link"
          href="https://github.com/ngseke/leetcode-dark-mode"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={gitHubLogo} alt="GitHub-Logo" />
        </a>
      </header>
    </div>
  );
};
