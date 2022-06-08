/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process')

module.exports = function checkIfLintPassed () {
  try {
    const stdout = execSync('npm run lint').toString()
    const matched = stdout.match(/✖ (\d) problem/)
    if (matched) {
      const problemCount = Number(matched[1])
      if (problemCount) return false
    }
    return true
  } catch (e) {
    return false
  }
}
