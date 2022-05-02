/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { execSync } = require('child_process')

const fileName = 'package.json'
const package = require(path.join('..', fileName))

const type = process.argv[2]
const { version } = package
let [major, minor, patch] = version.split('.').map(Number)

if (type === 'major') {
  major += 1
  minor = 0
  patch = 0
} else if (type === 'minor') {
  minor += 1
  patch = 0
} else {
  patch += 1
}

const newVersion = `${major}.${minor}.${patch}`

package.version = newVersion

const newPackage = JSON.stringify(package, 0, 2) + '\n'

fs.writeFileSync(fileName, newPackage)
execSync('npm install', { stdio: 'inherit' })

console.log(
  'Bumped version from ' +
  chalk.greenBright(version) +
  ' to ' +
  chalk.green.bold(newVersion)
)
