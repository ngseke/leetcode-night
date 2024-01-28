import { useTranslation } from 'react-i18next'
import { Switch } from './Switch'
import { useEnableAutoResetCode } from '../hooks/useEnableAutoResetCode'
import { useEnableInsertYoutubeLink } from '../hooks/useEnableInsertYoutubeLink'

export function ExtraFeatureOptions () {
  const { t } = useTranslation()

  const { isAutoResetCodeEnabled, setIsAutoResetCodeEnabled } = useEnableAutoResetCode()
  const { isInsertYoutubeLinkEnabled, setIsInsertYoutubeLinkEnabled } = useEnableInsertYoutubeLink()

  return (
    <div className="ts-wrap is-vertical is-start-aligned">
      <Switch
        checked={isAutoResetCodeEnabled}
        onChange={setIsAutoResetCodeEnabled}
        icon="rotate-left"
      >
        {t('option.autoResetCode')}
      </Switch>
      <Switch
        checked={isInsertYoutubeLinkEnabled}
        onChange={setIsInsertYoutubeLinkEnabled}
        icon="youtube"
      >
        {t('option.insertYoutubeLink')}
      </Switch>
    </div>
  )
}
