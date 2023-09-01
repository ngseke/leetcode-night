import styled from 'styled-components'
import { useEnableDarkTheme } from '../hooks/useEnableDarkTheme'
import { Logo } from './Logo'
import { colors } from '../modules/themes'

const Wrapper = styled.div({
  overflow: 'hidden',
})

const Content = styled.div.attrs({
  className: 'ts-content is-tertiary',
})({
  position: 'relative',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
})

const Moon = styled.span.attrs({
  children: '🌕',
})<{ show: boolean }>(({ show }) => ({
  position: 'absolute',
  right: 20,
  top: '50%',
  fontSize: '3rem',
  lineHeight: 1,
  transition: 'transform .4s .1s, text-shadow .6s .1s',
  transform: `translateY(${show ? '-50%' : '120%'})`,
  textShadow: `${colors.leetcodeNight} 0 0 ${show ? '10px' : 0}`,
}))

export function Header () {
  const { isDarkThemeEnabled } = useEnableDarkTheme()

  return (
    <Wrapper>
      <Content>
        <Logo />
        <Moon show={isDarkThemeEnabled} />
      </Content>
    </Wrapper>
  )
}
