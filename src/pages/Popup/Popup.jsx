import React, {useState} from 'react';
import './Popup.css';
import capybaraImages from './images/capybara.png'
import gitHubLogo from './images/GitHub-Logo.png'
import './SwitchButton.css'

const Popup = () => {
  const [isLight,setIsLight] = useState(true)
  return (
    <div className="App">
      <header className="App-header">
        <img src={capybaraImages} className={`App-logo ${isLight && 'horizontal-flip'}`} alt="logo" />
        <label  className="switch">
          <input onClick={()=>setIsLight(state => !state)} type="checkbox" checked={isLight}/>
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

export default Popup;
