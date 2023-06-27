import styled from 'styled-components'
import { colors } from '../modules/themes'

const HighlightText = styled.span.attrs({
  className: 'ts-text is-heavy',
})({
  color: colors.leetcodeNight,
  textShadow: 'rgba(255, 208, 25, 0.7) 0 0 2px',
})

export default HighlightText
