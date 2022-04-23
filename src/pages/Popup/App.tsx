import Options from './components/Options'
import Footer from './components/Footer'
import Switch from './components/Switch'
import GoToQuestion from './components/GoToQuestion'
import Tabs, { useTabs } from './components/Tabs'
import useEnableDarkTheme from './hooks/useEnableDarkTheme'
import Layout from './components/Layout'
import If from './components/If'
import Header from './components/Header'
import Link from './components/Link'
import Spacer from './components/Spacer'
import useEnableAutoResetCode from './hooks/useEnableAutoResetCode'

export default function App () {
  const { tab, setTab, isTabOptions, isTabQuestions } = useTabs()
  const { isDarkThemeEnabled, setIsDarkThemeEnabled } = useEnableDarkTheme()
  const { isAutoResetCodeEnabled, setIsAutoResetCodeEnabled } = useEnableAutoResetCode()

  return (
    <Layout
      header={<>
        <Header />
        <Tabs value={tab} onChange={setTab} />
      </>}
      body={<>
        <If is={isTabQuestions}>
          <h2 className="ts-header">
            <Link
              className="ts-text is-undecorated"
              href="https://leetcode.com/problemset/algorithms/"
            >
              Questions
            </Link>
          </h2>
          <GoToQuestion />
        </If>

        <If is={isTabOptions}>
          <Switch
            checked={isDarkThemeEnabled}
            onChange={setIsDarkThemeEnabled}
          >
            <span className="ts-header">Enable Dark Theme</span>
          </Switch>
          <Spacer />
          <Options disabled={!isDarkThemeEnabled} />
          <div className="ts-divider is-section" />

          <Switch
            checked={isAutoResetCodeEnabled}
            onChange={setIsAutoResetCodeEnabled}
          >
            <span className="ts-header">Auto reset code</span>
          </Switch>
          <div className="ts-text is-description">Always reset to default code definition.</div>
        </If>
      </>}
      footer={<Footer />}
    />
  )
}
