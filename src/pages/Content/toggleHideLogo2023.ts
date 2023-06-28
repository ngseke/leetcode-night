import styles from './styles/hide-logo-2023/style.sass'
import { StyleInjector } from './StyleInjector'

const styleInjector = new StyleInjector(styles)

export const toggleHideLogo2023 = (value: boolean) => styleInjector.toggle(value)
