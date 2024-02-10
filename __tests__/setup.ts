import '@testing-library/jest-dom'
import '../src/pages/Popup/i18n'

vi.spyOn(console, 'warn')
vi.spyOn(console, 'error')

Element.prototype.scrollIntoView = vi.fn()
