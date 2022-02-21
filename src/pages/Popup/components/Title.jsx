import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.h1({
  margin: '.5rem 0 1rem',
  userSelect: 'none',
})

const ColoredText = styled.span({
  color: "#ffd019",
  fontWeight: 900
})

export default function Title() {
  return (
    <Wrapper>
      LeetCode <ColoredText>Night</ColoredText>
    </Wrapper>
  )
}
