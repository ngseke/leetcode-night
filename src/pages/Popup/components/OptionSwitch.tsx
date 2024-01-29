import { Switch } from './Switch'
import { type StorageKey } from '../../../storage'
import { useChromeStorage } from '../hooks/useChromeStorage'
import { type PropsWithChildren } from 'react'

type OptionSwitchProps = PropsWithChildren<{
  storageKey: StorageKey,
  icon: string,
}>

export function OptionSwitch (
  { storageKey, icon, children }: OptionSwitchProps
) {
  const [value, setValue] = useChromeStorage(storageKey)

  if (!(typeof value === 'boolean' || value == null)) {
    return <>This component only supports boolean option!</>
  }

  return (
    <Switch
      checked={value ?? false}
      onChange={setValue}
      icon={icon}
    >
      {children}
    </Switch>
  )
}
