export default class BodyClassToggler {
  className: string

  constructor (className: string) {
    this.className = className
  }

  add () {
    this.$body?.classList.add(this.className)
  }

  remove () {
    this.$body?.classList.remove(this.className)
  }

  toggle (boolean: boolean) {
    if (boolean) this.add()
    else this.remove()
  }

  get $body () {
    return document.querySelector('body')
  }
}
