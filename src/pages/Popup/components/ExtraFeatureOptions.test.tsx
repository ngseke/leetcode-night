import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Options } from './Options'
import * as useChromeStorageHooks from '../hooks/useChromeStorage'
import { storageDefaultValues } from '../../../storage'

describe('ExtraFeatureOptions', () => {
  const mockedSetValue = vi.fn()
  vi.spyOn(useChromeStorageHooks, 'useChromeStorage')
    .mockImplementation((key) => {
      const mockedValue = storageDefaultValues[key]
      return [mockedValue, mockedSetValue]
    })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  function selectCheckbox (label: string) {
    return screen.queryByLabelText<HTMLInputElement>(label, { exact: false })
  }

  test('should toggle extra feature options', async () => {
    render(<Options />)

    async function assertChanged (label: string) {
      const checkbox = selectCheckbox(label)
      if (!checkbox) throw new Error('Failed to select the switch')

      const originalValue = checkbox.checked
      await userEvent.click(checkbox)

      expect(mockedSetValue).toHaveBeenLastCalledWith(!originalValue)
    }

    await assertChanged('Auto Reset Code')
    await assertChanged('Show YouTube Link Shortcut')
    await assertChanged('Show Dislike Count')
  })
})
