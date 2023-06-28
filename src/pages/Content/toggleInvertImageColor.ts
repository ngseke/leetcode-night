import styles from './styles/invert-image/style.sass'
import { StyleInjector } from './StyleInjector'

const styleInjector = new StyleInjector(styles)

export const toggleInvertImageColor = (value: boolean) => styleInjector.toggle(value)
