export const OPTIONS = {
  INVERT_IMAGE_COLOR: {
    name: 'Invert image color',
    key: 'invertImageColor',
    default: true
  },
  MASCOT: {
    name: 'Show Mascot',
    key: 'mascot',
    default: true
  }
} as const

export type OptionKey = typeof OPTIONS[keyof typeof OPTIONS]['key']

export const DEFAULT_OPTIONS = Object.values(OPTIONS)
  .reduce((prev, option) => ({
    ...prev,
    [option.key]: option.default
  }), {}) as OptionsForm

export type OptionsForm = Record<OptionKey, boolean>
