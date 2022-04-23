import styles from './styles/loading-mascot/style.sass'
import StyleInjector from './StyleInjector'

const styleInjector = new StyleInjector(styles)

export const toggleEnabledMascot = (value: boolean) => styleInjector.toggle(value)
