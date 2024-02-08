import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Options } from './Options'
import * as useChromeStorageHooks from '../hooks/useChromeStorage'
import * as useLeetCodeVersionHooks from '../hooks/useLeetCodeVersion'
import { storageDefaultValues } from '../../../storage'

describe('StyleOptions', () => {
  const mockedSetValue = vi.fn()
  vi.spyOn(useChromeStorageHooks, 'useChromeStorage')
    .mockImplementation((key) => {
      const mockedValue = storageDefaultValues[key]
      return [mockedValue, mockedSetValue]
    })
  const spyOnUseLeetCodeVersion =
    vi.spyOn(useLeetCodeVersionHooks, 'useLeetCodeVersion')

  beforeEach(() => {
    vi.clearAllMocks()
    spyOnUseLeetCodeVersion.mockReturnValue(['2023-dynamic-layout' as const])
  })

  function selectCheckbox (label: string) {
    return screen.queryByLabelText<HTMLInputElement>(label, { exact: false })
  }

  test('should toggle enable dark theme', async () => {
    render(<Options />)

    const checkbox = selectCheckbox('Enable Dark Theme')
    if (!checkbox) throw new Error('Failed to select the switch')

    const originalValue = checkbox.checked
    await userEvent.click(checkbox)

    expect(mockedSetValue).toHaveBeenLastCalledWith(!originalValue)
  })

  test('should toggle style options', async () => {
    spyOnUseLeetCodeVersion.mockReturnValue(['2022' as const])

    render(<Options />)

    async function assertChanged (label: string, key: string) {
      const checkbox = selectCheckbox(label)
      if (!checkbox) throw new Error('Failed to select the switch')

      const originalValue = checkbox.checked
      await userEvent.click(checkbox)

      expect(mockedSetValue).toHaveBeenLastCalledWith(
        expect.objectContaining({ [key]: !originalValue })
      )
    }

    await assertChanged('Show Mascot', 'mascot')
    await assertChanged('Invert Image Color', 'invertImageColor')
    await assertChanged('Hide LeetCode Logo', 'hideLogo')
  })

  test('should hide mascot option if the version of LeetCode is not 2022', () => {
    const label = 'Show Mascot'

    spyOnUseLeetCodeVersion.mockReturnValue(['2023-dynamic-layout' as const])
    const { rerender } = render(<Options />)
    expect(selectCheckbox(label)).not.toBeInTheDocument()

    spyOnUseLeetCodeVersion.mockReturnValue(['2023' as const])
    rerender(<Options />)
    expect(selectCheckbox(label)).not.toBeInTheDocument()

    spyOnUseLeetCodeVersion.mockReturnValue(['2022' as const])
    rerender(<Options />)
    expect(selectCheckbox(label)).toBeInTheDocument()
  })
})
