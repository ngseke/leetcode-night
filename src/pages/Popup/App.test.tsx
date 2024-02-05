import { render } from '@testing-library/react'
import { App } from './App'
import { mockChrome } from '../../../__tests__/chrome'

describe('Popup app', () => {
  test('should render successfully', () => {
    mockChrome()
    render(<App />)
  })
})
