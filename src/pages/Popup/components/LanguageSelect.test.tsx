import { render, screen } from '@testing-library/react'
import { LanguageSelect } from './LanguageSelect'

describe('LanguageSelect', () => {
  test('should render language options', async () => {
    const getOption = (name: string) => {
      return screen.getByRole<HTMLOptionElement>('option', { name })
    }
    render(<LanguageSelect />)

    expect(getOption('English').selected).toBe(true)
    expect(getOption('正體中文')).toBeInTheDocument()
    expect(getOption('简体中文')).toBeInTheDocument()
    expect(getOption('日本語')).toBeInTheDocument()
    expect(getOption('한국어')).toBeInTheDocument()
  })
})
