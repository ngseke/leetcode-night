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

import { useTranslation } from 'react-i18next'
import LanguageSelect from './components/LanguageSelect'
import LanguageBasedFontFamily from './components/LanguageBasedFontFamily'

const Divider = () => <div className="ts-divider is-section" />

export default function App () {
  const { tab, setTab, isTabOptions, isTabQuestions } = useTabs()
  const { isDarkThemeEnabled, setIsDarkThemeEnabled } = useEnableDarkTheme()
  const { isAutoResetCodeEnabled, setIsAutoResetCodeEnabled } = useEnableAutoResetCode()

  const { t } = useTranslation()

  return (
    <LanguageBasedFontFamily>
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
                {t('title.questions')}
              </Link>
            </h2>
            <GoToQuestion />
          </If>

          <If is={isTabOptions}>
            <Switch
              checked={isDarkThemeEnabled}
              onChange={setIsDarkThemeEnabled}
            >
              <span className="ts-header">{t('option.enableDarkTheme')}</span>
            </Switch>
            <div className="ts-text is-description">
              <span className="ts-icon is-lightbulb-icon is-end-spaced" />
              {t('option.enableDarkTheme2023Description')}
            </div>

            <Spacer />
            <Options />
            <Divider />

            <Switch
              checked={isAutoResetCodeEnabled}
              onChange={setIsAutoResetCodeEnabled}
            >
              <span className="ts-header">{t('option.autoResetCode')}</span>
            </Switch>
            <div className="ts-text is-description">
              {t('option.autoResetCodeDescription')}
            </div>
            <Divider />
            <LanguageSelect />
          </If>
        </>}
        footer={<Footer />}
      />
    </LanguageBasedFontFamily>
  )
}
