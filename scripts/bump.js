/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process')
const openReleasePage = require('./openReleasePage')

const execWithStdio = (command) => execSync(command, { stdio: 'inherit' })

async function bump () {
  const commitMessage = 'chore: bump version v%s'
  execWithStdio(`npx bumpp --commit "${commitMessage}"`)

  await openReleasePage()

  console.log('\n✅ All Done!')
}

bump()
