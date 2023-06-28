import Options from './components/Options'
import Footer from './components/Footer'
import Switch from './components/Switch'
import SearchQuestion from './components/SearchQuestion'
import Tabs, { useTabs } from './components/Tabs'
import Layout from './components/Layout'
import If from './components/If'
import Header from './components/Header'
import useEnableAutoResetCode from './hooks/useEnableAutoResetCode'

import { useTranslation } from 'react-i18next'
import LanguageSelect from './components/LanguageSelect'
import LanguageBasedFontFamily from './components/LanguageBasedFontFamily'
import OptionTitle from './components/OptionTitle'

const Divider = () => <div className="ts-divider is-section" />

export default function App () {
  const { tab, setTab, isTabOptions, isTabQuestions } = useTabs()
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
            <SearchQuestion />
          </If>

          <If is={isTabOptions}>
            <div className="ts-content">
              <OptionTitle icon="palette">{t('title.style')}</OptionTitle>

              <Options />
              <Divider />

              <OptionTitle icon="wand-magic-sparkles">{t('title.extraFeature')}</OptionTitle>
              <Switch
                checked={isAutoResetCodeEnabled}
                onChange={setIsAutoResetCodeEnabled}
                icon="rotate-left"
              >
                {t('option.autoResetCode')}
              </Switch>
              <div className="ts-text is-description">
                {t('option.autoResetCodeDescription')}
              </div>
              <Divider />

              <OptionTitle icon="language">{t('title.language')}</OptionTitle>
              <LanguageSelect />
            </div>
          </If>
        </>}
        footer={<Footer />}
      />
    </LanguageBasedFontFamily>
  )
}
