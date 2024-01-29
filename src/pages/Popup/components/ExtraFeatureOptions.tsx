import { useTranslation } from 'react-i18next'
import { AUTO_RESET_CODE_ENABLED_STORAGE_KEY, INSERT_DISLIKE_COUNT_STORAGE_KEY, INSERT_YOUTUBE_LINK_STORAGE_KEY } from '../../../storage'
import { OptionSwitch } from './OptionSwitch'

export function ExtraFeatureOptions () {
  const { t } = useTranslation()

  return (
    <div className="ts-wrap is-vertical is-start-aligned">
      <OptionSwitch
        storageKey={AUTO_RESET_CODE_ENABLED_STORAGE_KEY}
        icon="rotate-left"
      >
        {t('option.autoResetCode')}
      </OptionSwitch>
      <OptionSwitch
        storageKey={INSERT_YOUTUBE_LINK_STORAGE_KEY}
        icon="youtube"
      >
        {t('option.insertYoutubeLink')}
      </OptionSwitch>
      <OptionSwitch
        storageKey={INSERT_DISLIKE_COUNT_STORAGE_KEY}
        icon="thumbs-down"
      >
        {t('option.insertDislikeCount')}
        <span className="ts-badge is-small is-start-spaced">BETA</span>
      </OptionSwitch>
    </div>
  )
}
