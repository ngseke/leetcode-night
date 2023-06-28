import styles from './styles/hide-logo/style.sass'
import { StyleInjector } from './StyleInjector'

const styleInjector = new StyleInjector(styles)

export const toggleHideLogo = (value: boolean) => styleInjector.toggle(value)
