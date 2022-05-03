/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process')

module.exports = function checkIfGitDirty () {
  const stdout = execSync('git status --porcelain').toString()
  return !stdout
}
