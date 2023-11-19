import { $x } from './xpath'

export function waitForElement (selector: string): Promise<Element> {
  return new Promise(resolve => {
    const element = document.querySelector(selector)
    if (element) {
      return resolve(element)
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector)

      if (element) {
        resolve(element)
        observer.disconnect()
      }
    })

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    })
  })
}

export function waitForElementsByXpath (xpath: string): Promise<Node[]> {
  return new Promise(resolve => {
    const elements = $x(xpath)
    if (elements.length) {
      return resolve(elements)
    }

    const observer = new MutationObserver(() => {
      const elements = $x(xpath)
      if (elements.length) {
        resolve(elements)
        observer.disconnect()
      }
    })

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    })
  })
}

export function waitDOMContentLoaded () {
  return new Promise<void>((resolve) => {
    const eventName = 'DOMContentLoaded'
    const handlerLoaded = () => {
      document.removeEventListener(eventName, handlerLoaded)
      resolve()
    }
    document.addEventListener(eventName, handlerLoaded)
    if (document.readyState !== 'loading') handlerLoaded()
  })
}
