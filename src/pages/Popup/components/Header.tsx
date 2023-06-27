import styled from 'styled-components'
import useEnableDarkTheme from '../hooks/useEnableDarkTheme'
import Logo from './Logo'
import { colors } from '../modules/themes'

const Wrapper = styled.div({
  position: 'relative',
  overflow: 'hidden',
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
  fontFamily: '"Noto Sans TC"',
}))

export default function Header () {
  const { isDarkThemeEnabled } = useEnableDarkTheme()

  return (
    <Wrapper>
      <div className="ts-content is-tertiary">
        <Logo />
        <Moon show={isDarkThemeEnabled} />
      </div>
    </Wrapper>
  )
}
