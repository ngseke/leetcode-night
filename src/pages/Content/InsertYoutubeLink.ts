import debounce from 'debounce'
import { $x, createElement } from './dom'
import { INSERT_YOUTUBE_LINK_DEBOUNCE_DELAY, POWERED_BY_TEXT } from '../../constants'

type SelectContainer = () => Node
type RenderLink = (href: string) => HTMLAnchorElement
type GetTitle = () => string | null

class InsertYoutubeLink {
  selectContainer: SelectContainer
  renderLink: RenderLink
  getTitle: GetTitle

  containerAndLinkMap = new WeakMap<Node, HTMLAnchorElement>()
  insertedLinks = new Set<Node>()

  constructor (dependencies: {
    selectContainer: SelectContainer,
    renderLink: RenderLink,
    getTitle: GetTitle,
  }) {
    this.selectContainer = dependencies.selectContainer
    this.renderLink = dependencies.renderLink
    this.getTitle = dependencies.getTitle
  }

  generateYoutubeUrl (keyword: string) {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}`
  }

  tryInsert () {
    const title = this.getTitle()
    if (!title) return

    const container = this.selectContainer()
    if (!container) return

    const url = this.generateYoutubeUrl(title)
    const existedLink = this.containerAndLinkMap.get(container)

    if (existedLink) {
      existedLink.href = url
    } else {
      const newLink = this.renderLink(url)

      this.containerAndLinkMap.set(container, newLink)
      this.insertedLinks.add(newLink)
      container.appendChild(newLink)
    }
  }

  removeAll () {
    this.insertedLinks.forEach(link => {
      if (link instanceof Element) link.remove()
    })
    this.containerAndLinkMap = new Map()
    this.insertedLinks.clear()
  }
}

function renderLink (attributes: {
  className?: string,
  style?: string,
  href?: string,
}) {
  function createYoutubeLinkChildren () {
    const iconHtml = `
      <svg height="16px" viewBox="0 0 576 512" style="fill: currentColor; margin-right: 4px;"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg>
    `
    const textHtml = '<span>YouTube</span>'

    return createElement(`
      <span style="display: flex; align-items: center;">
        ${iconHtml}
        ${textHtml}
      </span>
    `)
  }

  const link = document.createElement('a')
  Object.assign(link, {
    target: '_blank',
    title: POWERED_BY_TEXT,
    ...attributes,
  })

  link.append(createYoutubeLinkChildren())

  return link
}

const insertYoutubeLink2022 = new InsertYoutubeLink({
  selectContainer: () => $x('//*[contains(@class, "css-10o4wqw")]')[0],
  renderLink: (href: string) => renderLink({
    className: 'btn__r7r7 css-1rdgofi',
    style: 'color: inherit;',
    href,
  }),
  getTitle: () => $x('//*[@data-cy="question-title"]')[0]?.textContent,
})

const insertYoutubeLink2023 = new InsertYoutubeLink({
  selectContainer: () => {
    const shareIconPath = 'M12.44 7.586a.6.6 0 10-1.2 0h1.2zm-6.734 5.035l.117-.588-.117.588zm-2.628-1.405l.424-.424-.424.424zM1.673 8.588l.588-.117-.588.117zm.292-2.966l.554.23-.554-.23zm1.89-2.304l-.333-.499.334.5zm2.853-.265a.6.6 0 000-1.2v1.2zm.25 3.434a.6.6 0 00.848.849l-.849-.849zm5.154-3.457a.6.6 0 10-.849-.849l.849.849zm-2.82-1.197a.6.6 0 000 1.2v-1.2zm2.546.6h.6a.6.6 0 00-.6-.6v.6zm-.6 2.566a.6.6 0 001.2 0h-1.2zm.003 2.587c0 .897-.266 1.774-.764 2.52l.998.666c.63-.943.966-2.052.966-3.186h-1.2zm-.764 2.52a4.533 4.533 0 01-2.035 1.669l.46 1.108a5.733 5.733 0 002.573-2.111l-.998-.667zm-2.035 1.669a4.534 4.534 0 01-2.619.258L5.59 13.21a5.733 5.733 0 003.313-.327l-.46-1.108zm-2.619.258a4.533 4.533 0 01-2.321-1.241l-.849.849A5.733 5.733 0 005.59 13.21l.234-1.177zm-2.321-1.241a4.533 4.533 0 01-1.24-2.321l-1.178.234a5.734 5.734 0 001.57 2.936l.848-.849zm-1.24-2.321a4.533 4.533 0 01.257-2.62l-1.108-.459a5.733 5.733 0 00-.327 3.313l1.177-.234zm.257-2.62a4.533 4.533 0 011.67-2.034l-.667-.998a5.733 5.733 0 00-2.111 2.573l1.108.46zm1.67-2.034a4.533 4.533 0 012.519-.764v-1.2a5.733 5.733 0 00-3.186.966l.667.998zm3.617 3.519l4.306-4.306-.849-.849-4.306 4.306.849.849zm1.487-4.303h2.545v-1.2H9.293v1.2zm1.945-.6v2.566h1.2V2.433h-1.2z'

    return $x(`
      //*[
        @class="mt-3 flex items-center space-x-4" and
        .//*[@d="${shareIconPath}"]
      ]
    `)[0]
  },
  renderLink: (href: string) => renderLink({
    className: 'flex cursor-pointer items-center space-x-1 rounded px-1 py-[3px] hover:bg-fill-3 dark:hover:bg-dark-fill-3 text-gray-6 dark:text-dark-gray-6 font-medium text-xs',
    href,
  }),
  getTitle: () => $x(`
    //a[
      @class="mr-2 text-label-1 dark:text-dark-label-1 hover:text-label-1 dark:hover:text-dark-label-1 text-lg font-medium" and
      contains(@href, "/problems/")
    ]
  `)[0]?.textContent,
})

const insertYoutubeLink2023DynamicLayout = new InsertYoutubeLink({
  selectContainer: () => {
    const difficultyXpath = `
      .//*[
        contains(@class, 'text-caption') and (
          contains(@class, 'text-difficulty-easy') or
          contains(@class, 'text-difficulty-medium') or
          contains(@class, 'text-difficulty-hard')
        )
    `

    return $x(`
      //*[@class="flexlayout__tab"]
      //*[@class="flex gap-1" and ${difficultyXpath}]]
    `)[0]
  },
  renderLink: (href: string) => renderLink({
    className: 'relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary cursor-pointer transition-colors hover:bg-fill-primary hover:text-text-primary text-sd-secondary-foreground hover:opacity-80',
    href,
  }),
  getTitle: () => $x(`
    //a[
      @class="no-underline hover:text-blue-s dark:hover:text-dark-blue-s truncate cursor-text whitespace-normal hover:!text-[inherit]" and
      contains(@href, "/problems/")
    ]
  `)[0]?.textContent,
})

let isStarted = false

const insertYoutubeLinkInstances = [
  insertYoutubeLink2022,
  insertYoutubeLink2023,
  insertYoutubeLink2023DynamicLayout,
]

const debouncedTryInsertAll = debounce(() => {
  if (!isStarted) return
  insertYoutubeLinkInstances
    .forEach(instance => instance.tryInsert())
}, INSERT_YOUTUBE_LINK_DEBOUNCE_DELAY)

const removeAll = () => {
  insertYoutubeLinkInstances
    .forEach(instance => instance.removeAll())
}

const observer = new MutationObserver(() => debouncedTryInsertAll())

export async function startInsertYoutubeLinkObserver () {
  if (isStarted) return

  isStarted = true
  debouncedTryInsertAll()
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
  })
}

export async function stopInsertYoutubeLinkObserver () {
  isStarted = false
  observer.disconnect()
  removeAll()
}
