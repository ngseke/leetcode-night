import { render } from 'react-dom'
import { App } from './App'

import 'tocas/dist/tocas.min.css'
import './index.css'

import './i18n'

render(<App />, window.document.querySelector('#app-container'))

if (module.hot) module.hot.accept()
