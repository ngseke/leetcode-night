import debounce from 'debounce'
import { $, $x } from './dom'
import { getSlug } from './slug'
import { type LikesAndDislikes, fetchLikesAndDislikes } from './fetchLikesAndDislikes'
import { POWERED_BY_TEXT } from '../../constants'

function formatNumber (value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

class InsertDislikeCount2023DynamicLayout {
  containerDatasetKey = 'leetcode_night_dislike_container'

  likeTextDatasetKey = `${this.containerDatasetKey}_like_text`
  customLikeTextDatasetKey = `${this.containerDatasetKey}_custom_like_text`
  customDislikeTextDatasetKey = `${this.containerDatasetKey}_custom_dislike_text`

  slug: string | null = null

  selectHandledContainer () {
    return $(`[data-${this.containerDatasetKey}]`)
  }

  handle ({ likes, dislikes }: LikesAndDislikes) {
    const container = selectLikeDislikeContainer()
    if (!container) return

    container.dataset[this.containerDatasetKey] = 'true'

    const [likeButton, dislikeButton] = container.querySelectorAll('button')
    if (!(likeButton && dislikeButton)) return

    const likeText = likeButton.querySelector(`${iconSelector} ~ div`) as HTMLElement
    if (!likeText) return

    // Create "custom like text" and insert it after the original one
    const customLikeText = likeText.cloneNode(true) as HTMLElement
    customLikeText.textContent = formatNumber(likes)

    likeText.after(customLikeText)

    // Insert the "custom dislike text"
    const dislikeText = likeText.cloneNode(true) as HTMLElement
    dislikeText.textContent = formatNumber(dislikes)
    dislikeText.title = POWERED_BY_TEXT
    dislikeText.style.lineHeight = '0' // Adjust the style so it won't expand the height of the button

    const dislikeIcon = dislikeButton.querySelector(iconSelector) as HTMLElement
    dislikeIcon?.after(dislikeText)

    // Hide the "original like text"
    likeText.style.display = 'none'

    // Mark modified elements with dataset
    likeText.dataset[this.likeTextDatasetKey] = 'true'
    customLikeText.dataset[this.customLikeTextDatasetKey] = 'true'
    dislikeText.dataset[this.customDislikeTextDatasetKey] = 'true'
  }

  /**
   * Call this function when the container is modified by LeetCode Night.
   * This will edit the text content of existing elements without inserting new
   * ones.
   */
  modifyHandled ({ likes, dislikes }: LikesAndDislikes) {
    const container = this.selectHandledContainer()
    if (!container) return

    const customLikeText = container.querySelector(`[data-${this.customLikeTextDatasetKey}]`)
    const customDislikeText = container.querySelector(`[data-${this.customDislikeTextDatasetKey}]`)
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
    const likeText = container.querySelector(`[data-${this.likeTextDatasetKey}]`) as HTMLElement
    if (likeText) likeText.style.display = ''

    // Remove custom elements
    const customLikeText = container.querySelector(`[data-${this.customLikeTextDatasetKey}]`)
    customLikeText?.remove()

    const customDislikeText = container.querySelector(`[data-${this.customDislikeTextDatasetKey}]`)
    customDislikeText?.remove()

    // Un-mark the container
    delete container.dataset[this.containerDatasetKey]
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

const debouncedTryInsertAll = debounce(() => {
  if (!isStarted) return
  instances.forEach(instance => instance.tryHandle())
}, 300)

const destroyAll = () => {
  instances.forEach(instance => instance.destroy())
}

const observer = new MutationObserver(() => debouncedTryInsertAll())

export async function startInsertDislikeCountObserver () {
  isStarted = true
  debouncedTryInsertAll()
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
