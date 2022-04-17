import { useEffect, useState } from 'react'
import { loadIsEnabled, saveIsEnabled } from '../../storage'
import Options from './components/Options'
import Logo from './components/Logo'
import Footer from './components/Footer'
import Switch from './components/Switch'
import GoToQuestion from './components/GoToQuestion'
import Tabs from './components/Tabs'
import styled from 'styled-components'

const AppLayout = styled.div({ height: '100%' })

export default function Popup () {
  const [isReady, setIsReady] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(function init () {
    loadIsEnabled().then(isEnabled => {
      setIsEnabled(isEnabled)
      setIsReady(true)
    })
  }, [])

  useEffect(() => {
    if (!isReady) return
    saveIsEnabled(isEnabled)
  }, [isEnabled, isReady])

  const [tab, setTab] = useState(0)

  return (
    <AppLayout className="ts-app-layout is-vertical">
      <div className="cell">
        <div className="ts-content is-tertiary">
          <Logo />
        </div>
        <Tabs value={tab} onChange={setTab} />
      </div>

      <div className="cell is-scrollable" style={{ flex: 1 }}>
        <main className="ts-content">
          {tab === 0 && <>
            <h2 className="ts-header">Questions</h2>
            <GoToQuestion />
          </>}

          {tab === 1 && <>
            <Switch
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
            >Enable Dark Theme</Switch>
            <Options disabled={!isEnabled} />
          </>}

          <div className="ts-space" />
        </main>
      </div>
      <div className="cell">
        <Footer />
      </div>
    </AppLayout>
  )
}
