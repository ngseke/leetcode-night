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

export default function App () {
  const { tab, setTab, isTabDarkTheme, isTabQuestions } = useTabs()
  const { isDarkThemeEnabled, setIsDarkThemeEnabled } = useEnableDarkTheme()

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

        <If is={isTabDarkTheme}>
          <Switch
            checked={isDarkThemeEnabled}
            onChange={setIsDarkThemeEnabled}
          >Enable Dark Theme</Switch>
          <Options disabled={!isDarkThemeEnabled} />
        </If>
      </>}
      footer={<Footer />}
    />
  )
}
