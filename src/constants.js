export const ENABLED_STORAGE_KEY = 'enabled'
export const OPTIONS_STORAGE_KEY = 'options'

const CLASS_NAME_PREFIX = 'leetcode-night-chrome-extension'
export const CLASS_NAMES = {
  BODY: CLASS_NAME_PREFIX,
  INVERT_IMAGE_COLOR: `${CLASS_NAME_PREFIX}-invert-image-color`,
  MASCOT: `${CLASS_NAME_PREFIX}-mascot`
}

export const sassAdditionalData = `
$body-class-name: ${CLASS_NAMES.BODY};
$invert-image-color-class-name: ${CLASS_NAMES.INVERT_IMAGE_COLOR};
$mascot-class-name: ${CLASS_NAMES.MASCOT};
`
