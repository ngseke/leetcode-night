import BodyClassToggler from './BodyClassToggler'
import { CLASS_NAMES } from '../../constants'

const bodyClassToggler = new BodyClassToggler(CLASS_NAMES.INVERT_IMAGE_COLOR)

export const toggleInvertImageColor = (value: boolean) => bodyClassToggler.toggle(value)
