import React, { useEffect, useState } from 'react'
import { loadIsEnabled, saveIsEnabled } from '../../storage'
import Options from './components/Options'
import Logo from './components/Logo'
import Footer from './components/Footer'
import Switch from './components/Switch'

export default function Popup() {
  const [isReady, setIsReady] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(function init() {
    loadIsEnabled().then(isEnabled => {
      setIsEnabled(isEnabled)
      setIsReady(true)
    })
  }, [])

  useEffect(() => {
    if (!isReady) return
    saveIsEnabled(isEnabled)
  }, [isEnabled, isReady])

  return (
    <div>
      <div className='ts-content is-tertiary'>
        <Logo />
      </div>
      <main className='ts-content'>
        <Switch
          checked={isEnabled}
          onChange={(e) => setIsEnabled(e.target.checked)}
        >Enable Dark Theme</Switch>
        <Options disabled={!isEnabled} />
        <div className="ts-space" />
        <Footer />
      </main>
    </div>
  )
}
