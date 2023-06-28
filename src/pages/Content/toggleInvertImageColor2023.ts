import styles from './styles/invert-image-2023/style.sass'
import { StyleInjector } from './StyleInjector'

const styleInjector = new StyleInjector(styles)

export const toggleInvertImageColor2023 = (value: boolean) => styleInjector.toggle(value)
