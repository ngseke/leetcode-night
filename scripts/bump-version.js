/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { execSync } = require('child_process')
const checkIfGitDirty = require('./checkIfGitDirty')

if (!checkIfGitDirty()) {
  console.log(chalk.red.bold('Error: There are uncommitted changes. Commit or stash them first.'))
  process.exit(1)
}

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
execSync('git add package.json package-lock.json', { stdio: 'inherit' })

const commitMessage = `chore: bump version v${newVersion}`
execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' })

execSync(`git tag v${newVersion}`, { stdio: 'inherit' })

console.log(
  '\nBumped version from ' +
  chalk.greenBright(version) +
  ' to ' +
  chalk.green.bold(newVersion)
)
