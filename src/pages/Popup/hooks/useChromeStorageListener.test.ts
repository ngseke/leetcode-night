import { renderHook } from '@testing-library/react'
import { mockChrome } from '../../../../__tests__/chrome'
import { type UseChromeStorageListenerHandler, useChromeStorageListener } from './useChromeStorageListener'
import { AUTO_RESET_CODE_ENABLED_STORAGE_KEY, ENABLED_STORAGE_KEY } from '../../../storage'

describe('useChromeStorageListener', () => {
  let emit: UseChromeStorageListenerHandler | undefined
  const key = ENABLED_STORAGE_KEY

  beforeEach(() => {
    const mockedChrome = mockChrome()
    mockedChrome.storage.onChanged.addListener
      .mockImplementation((callback) => { emit = callback })
    mockedChrome.storage.onChanged.removeListener
      .mockImplementation(() => { emit = undefined })
  })

  test('add and remove storage event listener', () => {
    const handler = vi.fn()
    const { unmount } = renderHook(
      () => useChromeStorageListener(handler, key)
    )

    const changes1 = { [key]: { newValue: true, oldValue: false } }
    emit?.(changes1, 'sync')
    expect(handler).toBeCalledWith(changes1, 'sync')
    handler.mockReset()

    const changes2 = { [key]: { newValue: false, oldValue: true } }
    emit?.(changes2, 'local')
    expect(handler).toBeCalledWith(changes2, 'local')
    handler.mockReset()

    unmount()
    emit?.(changes1, 'sync')
    expect(handler).not.toBeCalled()
  })

  test('should not call the handler if the key is not matched', () => {
    const handler = vi.fn()

    renderHook(() => useChromeStorageListener(handler, key))

    const anotherKey = AUTO_RESET_CODE_ENABLED_STORAGE_KEY
    const changes = { [anotherKey]: { newValue: true, oldValue: false } }
    emit?.(changes, 'sync')
    expect(handler).not.toBeCalled()
  })
})
