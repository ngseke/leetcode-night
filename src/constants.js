export const ENABLED_STORAGE_KEY = 'enabled'
export const OPTIONS_STORAGE_KEY = 'options'

const getPrefixedClassName = (string) => {
  const CLASS_NAME_PREFIX = 'leetcode-night-chrome-extension'
  return `${CLASS_NAME_PREFIX}${string ? '-' : ''}${string}`
}

export const CLASS_NAMES = {
  BODY: getPrefixedClassName(),
  INVERT_IMAGE_COLOR: getPrefixedClassName('invert-image-color'),
  MASCOT: getPrefixedClassName('mascot'),
  HIDE_LOGO: getPrefixedClassName('hide-logo'),
}

export const sassAdditionalData = `
$body-class-name: ${CLASS_NAMES.BODY}
$invert-image-color-class-name: ${CLASS_NAMES.INVERT_IMAGE_COLOR}
$mascot-class-name: ${CLASS_NAMES.MASCOT}
$hide-logo-class-name: ${CLASS_NAMES.HIDE_LOGO}
`
