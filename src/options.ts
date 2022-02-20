export const OPTIONS = {
  INVERT_IMAGE_COLOR: {
    name: 'Invert image color',
    key: 'invertImageColor',
  },
  MASCOT: {
    name: 'Show Mascot',
    key: 'mascot'
  }
} as const

export const DEFAULT_OPTIONS = {
  [OPTIONS.INVERT_IMAGE_COLOR.key]: true,
  [OPTIONS.MASCOT.key]: true
} as const

export type Options = typeof DEFAULT_OPTIONS
