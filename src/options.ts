export const OPTIONS = {
  INVERT_IMAGE_COLOR: {
    key: 'invertImageColor',
    icon: 'image',
    default: true,
  },
  MASCOT: {
    key: 'mascot',
    icon: 'cat',
    default: true,
  },
  HIDE_LOGO: {
    key: 'hideLogo',
    icon: 'eye-slash',
    default: false,
  },
} as const

export type OptionKey = typeof OPTIONS[keyof typeof OPTIONS]['key']

export const DEFAULT_OPTIONS = Object.values(OPTIONS)
  .reduce((prev, option) => ({
    ...prev,
    [option.key]: option.default,
  }), {}) as OptionsForm

export type OptionsForm = Record<OptionKey, boolean>
