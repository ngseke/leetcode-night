export default class StyleInjector {
  isInjected = false
  content: string
  $el: HTMLStyleElement

  constructor (content: unknown) {
    this.content = String(content)
    this.$el = document.createElement('style')
    this.$el.textContent = this.content
  }

  inject () {
    if (this.isInjected) return
    document.documentElement.appendChild(this.$el)
    this.isInjected = true
  }

  eject () {
    if (!this.isInjected) return
    document.documentElement.removeChild(this.$el)
    this.isInjected = false
  }

  toggle (value: boolean) {
    if (value) {
      this.inject()
    } else {
      this.eject()
    }
  }
}
