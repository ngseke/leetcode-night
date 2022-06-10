/* eslint-disable @typescript-eslint/no-var-requires */
const open = require('open')
const PackageJsonReaderWriter = require('./PackageJsonReaderWriter')

module.exports = async function openReleasePage () {
  const { default: urlJoin } = await import('url-join')
  const package = PackageJsonReaderWriter.read()
  const url = urlJoin(package.repository.url, 'releases')
  await open(url)
}
