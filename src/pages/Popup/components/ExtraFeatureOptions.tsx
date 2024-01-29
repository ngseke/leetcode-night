import { useTranslation } from 'react-i18next'
import { Switch } from './Switch'
import { AUTO_RESET_CODE_ENABLED_STORAGE_KEY, INSERT_DISLIKE_COUNT_STORAGE_KEY, INSERT_YOUTUBE_LINK_STORAGE_KEY } from '../../../storage'
import { useChromeStorage } from '../hooks/useChromeStorage'

export function ExtraFeatureOptions () {
  const { t } = useTranslation()

  const [isAutoResetCodeEnabled, setIsAutoResetCodeEnabled] =
    useChromeStorage(AUTO_RESET_CODE_ENABLED_STORAGE_KEY)
  const [isInsertYoutubeLinkEnabled, setIsInsertYoutubeLinkEnabled] =
    useChromeStorage(INSERT_YOUTUBE_LINK_STORAGE_KEY)
  const [isInsertDislikeCountEnabled, setIsInsertDislikeCountEnabled] =
    useChromeStorage(INSERT_DISLIKE_COUNT_STORAGE_KEY)

  return (
    <div className="ts-wrap is-vertical is-start-aligned">
      <Switch
        checked={isAutoResetCodeEnabled ?? false}
        onChange={setIsAutoResetCodeEnabled}
        icon="rotate-left"
      >
        {t('option.autoResetCode')}
      </Switch>
      <Switch
        checked={isInsertYoutubeLinkEnabled ?? false}
        onChange={setIsInsertYoutubeLinkEnabled}
        icon="youtube"
      >
        {t('option.insertYoutubeLink')}
      </Switch>
      <Switch
        checked={isInsertDislikeCountEnabled ?? false}
        onChange={setIsInsertDislikeCountEnabled}
        icon="thumbs-down"
      >
        {t('option.insertDislikeCount')}
        <span className="ts-badge is-small is-start-spaced">BETA</span>
      </Switch>
    </div>
  )
}
