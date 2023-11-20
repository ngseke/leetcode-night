import styles from './styles/hide-logo/style.module.sass?inline'
import { StyleInjector } from './StyleInjector'

const styleInjector = new StyleInjector(styles)

export const toggleHideLogo = (value: boolean) => styleInjector.toggle(value)
