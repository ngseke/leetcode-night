import BodyClassToggler from './BodyClassToggler'
import { CLASS_NAMES } from '../../constants'

const bodyClassToggler = new BodyClassToggler(CLASS_NAMES.MASCOT)

export const toggleEnabledMascot = (value: boolean) => bodyClassToggler.toggle(value)
