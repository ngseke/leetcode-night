import { Footer } from './components/Footer'
import { SearchQuestion } from './components/SearchQuestion'
import { useTabs, Tabs } from './components/Tabs'
import { Layout } from './components/Layout'
import { If } from './components/If'
import { Header } from './components/Header'
import { Options } from './components/Options'

export function App () {
  const { tab, setTab, isTabOptions, isTabQuestions } = useTabs()

  return (
    <Layout
      header={<>
        <Header />
        <Tabs value={tab} onChange={setTab} />
      </>}
      body={<>
        <If is={isTabQuestions}>
          <SearchQuestion />
        </If>

        <If is={isTabOptions}>
          <Options />
        </If>
      </>}
      footer={<Footer />}
    />
  )
}
