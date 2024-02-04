import { $, $x } from './dom'
import { getSlug } from './slug'
import { type LikesAndDislikes, fetchLikesAndDislikes } from './fetchLikesAndDislikes'
import { POWERED_BY_TEXT } from '../../constants'

function formatNumber (value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

export const datasetKey = 'leetcode_night_insert_dislike_count'

export const containerDatasetValue = 'container'
export const likeTextDatasetValue = 'likeText'
export const customLikeTextDatasetValue = 'customLikeText'
export const customDislikeTextDatasetValue = 'customDislikeText'

class InsertDislikeCount2023DynamicLayout {
  slug: string | null = null

  selectElement (datasetValue: string, parent?: Element) {
    const selector = `[data-${datasetKey}=${datasetValue}]`
    return (
      parent
        ? parent.querySelector(selector)
        : $(selector)
    ) as HTMLElement
  }

  selectHandledContainer () {
    return this.selectElement(containerDatasetValue)
  }

  selectLikeText () {
    const container = this.selectHandledContainer()
    return this.selectElement(likeTextDatasetValue, container)
  }

  selectCustomLikeText () {
    const container = this.selectHandledContainer()
    return this.selectElement(customLikeTextDatasetValue, container)
  }

  selectCustomDislikeText () {
    const container = this.selectHandledContainer()
    return this.selectElement(customDislikeTextDatasetValue, container)
  }

  handle ({ likes, dislikes }: LikesAndDislikes) {
    const container = selectLikeDislikeContainer()
    if (!container) return

    container.dataset[datasetKey] = containerDatasetValue

    const [likeButton, dislikeButton] = container.querySelectorAll('button')
    if (!(likeButton && dislikeButton)) return

    const likeText = likeButton.querySelector(`${iconSelector} ~ div`) as HTMLElement
    if (!likeText) return

    // Create "custom like text" and insert it after the original one
    const customLikeText = likeText.cloneNode(true) as HTMLElement
    customLikeText.textContent = formatNumber(likes)

    likeText.after(customLikeText)

    // Insert the "custom dislike text"
    const customDislikeText = likeText.cloneNode(true) as HTMLElement
    customDislikeText.textContent = formatNumber(dislikes)
    customDislikeText.title = POWERED_BY_TEXT
    customDislikeText.style.lineHeight = '0' // Adjust the style so it won't expand the height of the button

    const dislikeIcon = dislikeButton.querySelector(iconSelector) as HTMLElement
    dislikeIcon?.after(customDislikeText)

    // Hide the "original like text"
    likeText.style.display = 'none'

    // Mark modified elements with dataset
    likeText.dataset[datasetKey] = likeTextDatasetValue
    customLikeText.dataset[datasetKey] = customLikeTextDatasetValue
    customDislikeText.dataset[datasetKey] = customDislikeTextDatasetValue
  }

  /**
   * Call this function when the container is modified by LeetCode Night.
   * This will edit the text content of existing elements without inserting new
   * ones.
   */
  modifyHandled ({ likes, dislikes }: LikesAndDislikes) {
    const container = this.selectHandledContainer()
    if (!container) return

    const customLikeText = this.selectCustomLikeText()
    const customDislikeText = this.selectCustomDislikeText()
    if (!(customLikeText && customDislikeText)) return

    customLikeText.textContent = formatNumber(likes)
    customDislikeText.textContent = formatNumber(dislikes)
  }

  async tryHandle () {
    const slug = getSlug()
    if (!slug) return

    const handledContainer = this.selectHandledContainer()

    const likesAndDislikes = await fetchLikesAndDislikes(slug)
    if (handledContainer) {
      if (slug !== this.slug) {
        this.modifyHandled(likesAndDislikes)
        this.slug = slug
      }
      return
    }

    this.handle(likesAndDislikes)
  }

  /** Revert all operations done in `handle()` */
  destroy () {
    const container = this.selectHandledContainer()
    if (!container) return

    // Restore the display of  "original like text"
    const likeText = this.selectLikeText()
    if (likeText) likeText.style.display = ''

    // Remove custom elements
    const customLikeText = this.selectCustomLikeText()
    customLikeText?.remove()

    const customDislikeText = this.selectCustomDislikeText()
    customDislikeText?.remove()

    // Un-mark the container
    delete container.dataset[datasetKey]
  }
}

function selectLikeDislikeContainer () {
  return $x(`
    //*[
      @class="mr-1 flex overflow-hidden rounded-lg bg-fill-secondary dark:bg-fill-secondary" and
      .//*[@data-icon="thumbs-up"]
    ]
  `)[0]
}

const iconSelector = '.relative.text-\\[14px\\].leading-\\[normal\\].p-\\[1px\\].before\\:block.before\\:h-3\\.5.before\\:w-3\\.5'

let isStarted = false

const instances = [
  new InsertDislikeCount2023DynamicLayout(),
]

const handleMutation = () => {
  if (!isStarted) return
  instances.forEach(instance => instance.tryHandle())
}

const destroyAll = () => {
  instances.forEach(instance => instance.destroy())
}

const observer = new MutationObserver(() => handleMutation())

export async function startInsertDislikeCountObserver () {
  if (isStarted) return

  isStarted = true
  handleMutation()
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
  })
}

export async function stopInsertDislikeCountObserver () {
  isStarted = false
  observer.disconnect()
  destroyAll()
}
