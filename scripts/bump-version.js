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

const execWithStdio = (command) => execSync(command, { stdio: 'inherit' })

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
  execWithStdio('npm install')

  await confirm('Commit these changes?')
  execWithStdio('git add package.json package-lock.json')

  const commitMessage = `chore: bump version v${newVersion}`
  execWithStdio(`git commit -m "${commitMessage}"`)

  await confirm('Create a new tag ' + chalk.green.bold(`v${newVersion}`) + ' ?')
  const tagName = `v${newVersion}`
  execWithStdio(`git tag ${tagName}`)

  await confirm('Git push to origin?')
  execWithStdio('git push')
  execWithStdio(`git push origin ${tagName}`)

  console.log('\n✅ All Done!')
}

bumpVersion()
