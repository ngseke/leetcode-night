import Options from './components/Options'
import Logo from './components/Logo'
import Footer from './components/Footer'
import Switch from './components/Switch'
import GoToQuestion from './components/GoToQuestion'
import Tabs, { useTabs } from './components/Tabs'
import styled from 'styled-components'
import useEnableDarkTheme from './hooks/useEnableDarkTheme'

const AppLayout = styled.div({ height: '100%' })

export default function App () {
  const { tab, setTab, isTabDarkTheme, isTabQuestions } = useTabs()
  const { isDarkThemeEnabled, setIsDarkThemeEnabled } = useEnableDarkTheme()

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
          {isTabQuestions && <>
            <h2 className="ts-header">Questions</h2>
            <GoToQuestion />
          </>}

          {isTabDarkTheme && <>
            <Switch
              checked={isDarkThemeEnabled}
              onChange={(e) => setIsDarkThemeEnabled(e.target.checked)}
            >Enable Dark Theme</Switch>
            <Options disabled={!isDarkThemeEnabled} />
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
