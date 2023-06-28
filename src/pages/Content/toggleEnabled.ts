import styles from './styles/dark-theme/style.sass'
import { StyleInjector } from './StyleInjector'

const styleInjector = new StyleInjector(styles)

export const toggleEnabled = (value: boolean) => styleInjector.toggle(value)
