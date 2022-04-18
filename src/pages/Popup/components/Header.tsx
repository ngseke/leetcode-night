import styled from 'styled-components'
import useEnableDarkTheme from '../hooks/useEnableDarkTheme'
import Logo from './Logo'

const Wrapper = styled.div({
  position: 'relative',
  overflow: 'hidden',
})

const Moon = styled.span<{ show: boolean }>(({ show }) => ({
  position: 'absolute',
  right: 20,
  top: '50%',
  transition: 'all .4s .01s',
  transform: `translateY(${show ? '-50%' : '100%'})`,
  fontSize: '3rem',
  lineHeight: 1,
}))

export default function Header () {
  const { isDarkThemeEnabled } = useEnableDarkTheme()

  return (
    <Wrapper>
      <div className="ts-content is-tertiary">
        <Logo />
        <Moon show={isDarkThemeEnabled}>🌕</Moon>
      </div>
    </Wrapper>
  )
}
