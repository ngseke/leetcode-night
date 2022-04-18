import styled from 'styled-components'

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
      LeetCode <ColoredText>Night</ColoredText>
    </Wrapper>
  )
}
