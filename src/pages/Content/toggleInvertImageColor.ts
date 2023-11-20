import styles from './styles/invert-image/style.module.sass?inline'
import { StyleInjector } from './StyleInjector'

const styleInjector = new StyleInjector(styles)

export const toggleInvertImageColor = (value: boolean) => styleInjector.toggle(value)
