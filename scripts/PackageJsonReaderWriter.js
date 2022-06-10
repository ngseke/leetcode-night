/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

module.exports = class PackageJsonReaderWriter {
  static fileName = 'package.json'

  static read () {
    const content = require(path.join('..', this.fileName))
    return content
  }

  static write (content) {
    fs.writeFileSync(this.fileName, content)
  }
}
