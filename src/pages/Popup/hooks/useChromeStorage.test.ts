import { act, renderHook, waitFor } from '@testing-library/react'
import * as hooks from './useChromeStorageListener'
import * as storage from '../../../storage'
import { useChromeStorage } from './useChromeStorage'
import { ENABLED_STORAGE_KEY } from '../../../storage'

describe('useChromeStorage', () => {
  let emitChanges: hooks.UseChromeStorageListenerHandler | undefined
  vi.spyOn(hooks, 'useChromeStorageListener')
    .mockImplementation((handler) => { emitChanges = handler })

  const spyOnGetStorage = vi.spyOn(storage, 'getStorage')
  const spyOnSetStorage = vi.spyOn(storage, 'setStorage')

  beforeEach(() => {
    vi.clearAllMocks()
    spyOnGetStorage.mockImplementation(async () => { return true })
    spyOnSetStorage.mockImplementation(async () => {})
  })

  const key = ENABLED_STORAGE_KEY

  test('should get initial value from chrome storage', async () => {
    const { result } = renderHook(() => useChromeStorage(key))
    await waitFor(() => {})

    expect(spyOnGetStorage).toBeCalledTimes(1)
    expect(result.current[0]).toBe(true)
  })

  test('should update value when storage listener is emitted', async () => {
    const { result } = renderHook(() => useChromeStorage(key))
    await waitFor(() => {})

    const changes1 = { [key]: { newValue: false, oldValue: true } }
    act(() => emitChanges?.(changes1, 'sync'))
    expect(result.current[0]).toBe(false)

    const changes2 = { [key]: { newValue: true, oldValue: false } }
    act(() => emitChanges?.(changes2, 'sync'))
    expect(result.current[0]).toBe(true)

    const anotherKey = storage.AUTO_RESET_CODE_ENABLED_STORAGE_KEY
    const anotherChanges = { [anotherKey]: { newValue: true, oldValue: false } }

    act(() => emitChanges?.(anotherChanges, 'sync'))
    expect(result.current[0]).toBe(true)
  })

  test('should not update if the two objects are equal', async () => {
    const objectValue = {
      invertImageColor: true,
      mascot: true,
      hideLogo: true,
    }
    spyOnGetStorage.mockImplementation(async () => ({ ...objectValue }))

    const key = storage.OPTIONS_STORAGE_KEY
    const { result } = renderHook(() => useChromeStorage(key))
    await waitFor(() => {})

    expect(result.current[0]).toMatchObject({ ...objectValue })
    const previousValue = result.current[0]

    const change1 = {
      [key]: {
        newValue: { ...objectValue },
        oldValue: { ...objectValue },
      },
    }
    act(() => emitChanges?.(change1, 'sync'))

    expect(result.current[0]).toBe(previousValue)

    const change2 = {
      [key]: {
        newValue: { invertImageColor: false, mascot: false, hideLogo: true },
        oldValue: { ...objectValue },
      },
    }
    act(() => emitChanges?.(change2, 'sync'))

    expect(result.current[0]).not.toBe(previousValue)
    expect(result.current[0]).toMatchObject(
      { invertImageColor: false, mascot: false, hideLogo: true }
    )
  })

  test('should save value to the chrome storage', async () => {
    const { result } = renderHook(() => useChromeStorage(key))
    await waitFor(() => {})

    await act(async () => await result.current[1](false))
    expect(spyOnSetStorage).toBeCalledWith(key, false)
  })

  test('should not save if the two values/objects are equal', async () => {
    const { result, rerender } = renderHook(
      (key: storage.StorageKey) => useChromeStorage(key),
      { initialProps: key }
    )
    await waitFor(() => {})

    await act(async () => await result.current[1](true))
    expect(spyOnSetStorage).not.toBeCalled()
    await act(async () => await result.current[1](false))
    expect(spyOnSetStorage).toBeCalled()
    spyOnSetStorage.mockClear()

    const objectValue = {
      invertImageColor: true,
      mascot: true,
      hideLogo: true,
    }
    spyOnGetStorage.mockImplementation(async () => ({ ...objectValue }))
    rerender(storage.OPTIONS_STORAGE_KEY)
    await waitFor(() => {})

    await act(async () => await result.current[1]({ ...objectValue }))
    expect(spyOnSetStorage).not.toBeCalled()

    await act(async () => await result.current[1]({ ...objectValue, hideLogo: false }))
    expect(spyOnSetStorage).toBeCalled()
  })
})
