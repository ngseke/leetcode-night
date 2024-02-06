import { act, renderHook } from '@testing-library/react'
import { useSelectedIndex } from './useSelectedIndex'

describe('useSelectedIndex', () => {
  test('increase and decrease selected index', () => {
    const { result } = renderHook(() => useSelectedIndex(3))

    expect(result.current.selectedIndex).toBe(0)
    act(() => { result.current.increaseSelectedIndex() })
    expect(result.current.selectedIndex).toBe(1)
    act(() => { result.current.increaseSelectedIndex() })
    expect(result.current.selectedIndex).toBe(2)
    act(() => { result.current.increaseSelectedIndex() })
    expect(result.current.selectedIndex).toBe(0)

    act(() => { result.current.decreaseSelectedIndex() })
    expect(result.current.selectedIndex).toBe(2)
    act(() => { result.current.decreaseSelectedIndex() })
    expect(result.current.selectedIndex).toBe(1)
  })

  test('reset selected index', () => {
    const { result } = renderHook(() => useSelectedIndex(10))

    act(() => {
      for (let i = 0; i < 5; i++) {
        result.current.increaseSelectedIndex()
      }
    })
    expect(result.current.selectedIndex).toBe(5)

    act(() => { result.current.resetSelectedIndex() })
    expect(result.current.selectedIndex).toBe(0)
  })

  test('should reset index when length changes', () => {
    const { result, rerender } = renderHook(
      (args: Parameters<typeof useSelectedIndex>) => useSelectedIndex(...args),
      { initialProps: [5] }
    )

    act(() => {
      for (let i = 0; i < 3; i++) {
        result.current.increaseSelectedIndex()
      }
    })
    expect(result.current.selectedIndex).toBe(3)

    rerender([3])
    expect(result.current.selectedIndex).toBe(0)
  })
})
