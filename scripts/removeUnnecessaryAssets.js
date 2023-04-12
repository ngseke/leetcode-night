/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process')

const execWithStdio = (command) => execSync(command, { stdio: 'inherit' })

async function removeUnnecessaryAssets () {
  execWithStdio('rm build/*.svg')
  console.log('✅ Removed all `build/*.svg` successfully!')
}

removeUnnecessaryAssets()
