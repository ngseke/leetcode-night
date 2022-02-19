export const OPTIONS = {
  INVERT_IMAGE_COLOR: {
    name: 'Invert image color',
    key: 'invertImageColor',
  },
  MASCOT:{
    name: 'Show Mascot',
    key: 'mascot'
  }
}

export const DEFAULT_OPTIONS = {
  [OPTIONS.INVERT_IMAGE_COLOR.key]: true,
  [OPTIONS.MASCOT.key]: true
}
