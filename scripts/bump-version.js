/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require('chalk')
const { execSync } = require('child_process')
const inquirer = require('inquirer')
const checkIfGitDirty = require('./checkIfGitDirty')
const checkIfLintPassed = require('./checkIfLintPassed')
const openReleasePage = require('./openReleasePage')
const PackageJsonReaderWriter = require('./PackageJsonReaderWriter')

const exit = () => process.exit(1)

const printErrorMessageAndExit = (message) => {
  console.log(chalk.red.bold('Error: ') + message)
  exit()
}

const confirm = async (message) => {
  const { ok } = await inquirer.prompt({ type: 'confirm', name: 'ok', message })
  if (!ok) exit()
}

const execWithStdio = (command) => execSync(command, { stdio: 'inherit' })

const getVersionDiff = (version, newVersion) =>
  `${chalk(version)} → ${chalk.green.bold(newVersion)}`

const getVersionOptions = (version) => {
  const [major, minor, patch] = version.split('.').map(Number)

  const nextPatchVersion = [major, minor, patch + 1].join('.')
  const nextMinorVersion = [major, minor + 1, 0].join('.')
  const nextMajorVersion = [major + 1, 0, 0].join('.')

  const getName = (type, newVersion) =>
    `${type} (${getVersionDiff(version, newVersion)})`

  return [
    {
      name: getName('Patch', nextPatchVersion),
      value: nextPatchVersion,
    },
    {
      name: getName('Minor', nextMinorVersion),
      value: nextMinorVersion,
    },
    {
      name: getName('Major', nextMajorVersion),
      value: nextMajorVersion,
    },
  ]
}

async function bumpVersion () {
  if (!checkIfGitDirty()) {
    printErrorMessageAndExit(
      'There are uncommitted changes. Commit or stash them first.'
    )
  }

  if (!checkIfLintPassed()) {
    printErrorMessageAndExit(
      'There are some lint issues. Please fix them before bumping the version.'
    )
  }

  const package = PackageJsonReaderWriter.read()
  const { version } = package

  const { newVersion } = await inquirer.prompt({
    type: 'list',
    name: 'newVersion',
    message: 'Select the new version to bump:',
    choices: getVersionOptions(version),
  })

  const versionDiff = getVersionDiff(version, newVersion)

  package.version = newVersion

  const newPackage = JSON.stringify(package, 0, 2) + '\n'

  await confirm(
    'Are you sure you want to bump the version of `package.json`? \n  ' +
    versionDiff
  )

  PackageJsonReaderWriter.write(newPackage)

  await confirm('Run `npm install`? (For updating `package-lock.json`)')
  execWithStdio('npm install')

  await confirm('Commit these changes?')
  execWithStdio('git add package.json package-lock.json')

  const tagName = `v${newVersion}`
  const commitMessage = `chore: bump version ${tagName}`
  execWithStdio(`git commit -m "${commitMessage}"`)

  await confirm('Create a new tag ' + chalk.green.bold(tagName) + ' ?')
  execWithStdio(`git tag ${tagName}`)

  await confirm('Git push to origin?')
  execWithStdio('git push')
  execWithStdio(`git push origin ${tagName}`)

  await openReleasePage()

  console.log('\n✅ All Done!')
}

bumpVersion()
