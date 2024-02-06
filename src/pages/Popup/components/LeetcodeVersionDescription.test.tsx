import { render } from '@testing-library/react'
import { LeetcodeVersionDescription } from './LeetcodeVersionDescription'

describe('LeetcodeVersionDescription', () => {
  test('LeetcodeVersionDescription', () => {
    const { container, rerender } = render(
      <LeetcodeVersionDescription version={'2022'} />
    )
    expect(container.firstChild).toBeNull()

    rerender(
      <LeetcodeVersionDescription version={'2023'} />
    )
    expect(container.firstChild).not.toBeNull()

    rerender(
      <LeetcodeVersionDescription version={'2023-dynamic-layout'} />
    )
    expect(container.firstChild).not.toBeNull()
  })
})
