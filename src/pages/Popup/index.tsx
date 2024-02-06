import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

import 'tocas/dist/tocas.min.css'
import './index.css'

import './i18n'
const root = document.getElementById('app-container')

if (!root) throw new Error('Failed to select the root!')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
