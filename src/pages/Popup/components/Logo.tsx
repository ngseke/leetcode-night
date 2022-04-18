import styled from 'styled-components'
import Link from './Link'

const Wrapper = styled.h1({
  margin: 0,
  fontSize: 28,
})

const ColoredText = styled.span({
  color: '#ffd019',
  fontWeight: 900,
})

export default function Logo () {
  return (
    <Wrapper>
      <Link
        className="ts-text is-undecorated"
        href="https://leetcode.com/"
      >
        LeetCode
      </Link>
      <ColoredText> Night</ColoredText>
    </Wrapper>
  )
}
