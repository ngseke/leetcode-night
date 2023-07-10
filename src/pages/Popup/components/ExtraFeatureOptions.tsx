import { useTranslation } from 'react-i18next'
import { Switch } from './Switch'
import { useEnableAutoResetCode } from '../hooks/useEnableAutoResetCode'

export function ExtraFeatureOptions () {
  const { t } = useTranslation()

  const { isAutoResetCodeEnabled, setIsAutoResetCodeEnabled } = useEnableAutoResetCode()

  return (
    <div>
      <Switch
        checked={isAutoResetCodeEnabled}
        onChange={setIsAutoResetCodeEnabled}
        icon="rotate-left"
      >
        {t('option.autoResetCode')}
      </Switch>
    </div>
  )
}
