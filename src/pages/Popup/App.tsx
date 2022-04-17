import Options from './components/Options'
import Logo from './components/Logo'
import Footer from './components/Footer'
import Switch from './components/Switch'
import GoToQuestion from './components/GoToQuestion'
import Tabs, { useTabs } from './components/Tabs'
import useEnableDarkTheme from './hooks/useEnableDarkTheme'
import Layout from './components/Layout'
import If from './components/If'

export default function App () {
  const { tab, setTab, isTabDarkTheme, isTabQuestions } = useTabs()
  const { isDarkThemeEnabled, setIsDarkThemeEnabled } = useEnableDarkTheme()

  return (
    <Layout
      header={<>
        <div className="ts-content is-tertiary">
          <Logo />
        </div>
        <Tabs value={tab} onChange={setTab} />
      </>}
      body={<>
        <If is={isTabQuestions}>
          <h2 className="ts-header">Questions</h2>
          <GoToQuestion />
        </If>

        <If is={isTabDarkTheme}>
          <Switch
            checked={isDarkThemeEnabled}
            onChange={(e) => setIsDarkThemeEnabled(e.target.checked)}
          >Enable Dark Theme</Switch>
          <Options disabled={!isDarkThemeEnabled} />
        </If>
      </>}
      footer={<Footer />}
    />
  )
}
