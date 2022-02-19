import React from 'react'
import styled from 'styled-components'
import capybara from '../images/capybara.png'

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

export default function EnabledSwitch({ value, onChange }) {
  return (
    <Wrapper>
      <img
        src={capybara}
        className={`App-logo ${value ? 'horizontal-flip' : ''}`}
        alt="logo"
      />
      <label className="switch">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider round"></span>
      </label>
    </Wrapper>
  )
}
