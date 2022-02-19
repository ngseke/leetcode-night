import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import 'normalize.css'
import './Popup.css'
import './SwitchButton.css'
import { loadIsEnabled, saveIsEnabled } from '../../storage';
import EnabledSwitch from './components/EnabledSwitch';
import GithubLink from './components/GithubLink';
import Options from './components/Options';


const App = styled.div({
  backgroundColor: 'rgb(40,42,46)',
  color: 'rgb(215, 217, 219)',
  height: '100%',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  padding: 16,
})

const Col = styled.div({
  display: 'flex',
  height: '100%',
})

const Divider = styled.div({
  flex: '0 0 auto',
  width: 'auto',
  borderLeft: 'solid rgba(255,255,255, .1) 1px',
  margin: '0 20px',
})

const SideBar = styled.div({
  flex: '0 0 auto',
  width: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

const Main = styled.div({
  flex: '1 0 0%',
})

const Title = styled.h1({
  fontSize: 20
})


export default function Popup() {
  const [isReady, setIsReady] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(function init() {
    loadIsEnabled().then(isEnabled => {
      setIsEnabled(isEnabled)
      setIsReady(true)
    })
  }, [])

  useEffect(() => {
    if (!isReady) return
    saveIsEnabled(isEnabled)
  }, [isEnabled, isReady])

  return (
    <App>
      <Col>
        <SideBar>
          <EnabledSwitch value={isEnabled} onChange={setIsEnabled} />
          <GithubLink />
        </SideBar>
        <Divider />
        <Main>
          <Title>LeetCode Dark Mode</Title>
          <Options disabled={!isEnabled} />
        </Main>
      </Col>
    </App>
  );
};
