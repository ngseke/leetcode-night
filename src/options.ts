export const OPTIONS = {
  INVERT_IMAGE_COLOR: {
    name: 'Invert image color',
    key: 'invertImageColor',
    icon: 'image',
    default: true
  },
  MASCOT: {
    name: 'Show mascot',
    key: 'mascot',
    icon: 'cat',
    default: true
  },
  HIDE_LOGO: {
    name: 'Hide logo',
    key: 'hideLogo',
    icon: 'eye-slash',
    default: false
  },
} as const

export type OptionKey = typeof OPTIONS[keyof typeof OPTIONS]['key']

export const DEFAULT_OPTIONS = Object.values(OPTIONS)
  .reduce((prev, option) => ({
    ...prev,
    [option.key]: option.default
  }), {}) as OptionsForm

export type OptionsForm = Record<OptionKey, boolean>
