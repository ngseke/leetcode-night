import { render } from 'react-dom'
import { SWRConfig } from 'swr'

import App from './App'
import './index.css'

function localStorageProvider () {
  const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'))
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-cache', appCache)
  })
  return map
}

render((
  <SWRConfig value={{ provider: localStorageProvider }}>
    <App />
  </SWRConfig>
), window.document.querySelector('#app-container'))

if (module.hot) module.hot.accept()
