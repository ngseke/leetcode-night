import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Wrapper = styled.div<{ isZh: boolean }>(({ isZh }) => ({
  display: 'contents',
  fontFamily: isZh ? '"Noto Sans TC"' : '"M PLUS Rounded 1c"',
}))

const LanguageBasedFontFamily: FC = ({ children }) => {
  const { i18n } = useTranslation()
  const isZh = i18n.resolvedLanguage === 'zh-Hant'

  return (
    <Wrapper isZh={isZh}>
      {children}
    </Wrapper>
  )
}
export default LanguageBasedFontFamily
