import BodyClassToggler from './BodyClassToggler'
import { CLASS_NAMES } from '../../constants'

const bodyClassToggler = new BodyClassToggler(CLASS_NAMES.HIDE_LOGO)

export const toggleHideLogo = (value: boolean) => bodyClassToggler.toggle(value)
