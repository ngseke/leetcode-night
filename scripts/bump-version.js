/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { execSync } = require('child_process')
const inquirer = require('inquirer')
const checkIfGitDirty = require('./checkIfGitDirty')

const exit = () => process.exit(1)

const confirm = async (message) => {
  const { ok } = await inquirer.prompt({ type: 'confirm', name: 'ok', message })
  if (!ok) exit()
}

async function bumpVersion () {
  if (!checkIfGitDirty()) {
    console.log(
      chalk.red.bold('Error: ') +
      'There are uncommitted changes. Commit or stash them first.'
    )
    exit()
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

  const versionDiff =
    `${chalk(version)} → ✨ ${chalk.green.bold(newVersion)}`

  package.version = newVersion

  const newPackage = JSON.stringify(package, 0, 2) + '\n'

  await confirm(
    'Are you sure you want to bump the version of `package.json`? \n  ' +
    versionDiff
  )

  fs.writeFileSync(fileName, newPackage)

  await confirm('Run `npm install`? (For updating `package-lock.json`)')
  execSync('npm install', { stdio: 'inherit' })

  await confirm('Commit these changes?')
  execSync('git add package.json package-lock.json', { stdio: 'inherit' })

  const commitMessage = `chore: bump version v${newVersion}`
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' })

  await confirm('Create a new tag ' + chalk.green.bold(`v${newVersion}`) + ' ?')
  const tagName = `v${newVersion}`
  execSync(`git tag ${tagName}`, { stdio: 'inherit' })

  await confirm('Git push to origin?')
  execSync('git push', { stdio: 'inherit' })
  execSync(`git push origin ${tagName}`, { stdio: 'inherit' })

  console.log('\n✅ All Done!')
}

bumpVersion()
