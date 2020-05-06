/**
 * Expose the daemon's API.
 */
const { command: dl } = require('./dl/command')
const { command: ls } = require('./ls/command')
const { command: stat } = require('./stat/command')

const procedures = {

  /**
   * Download a file.
   */
  dl,

  /**
   * List the files.
   */
  ls,

  /**
   * Get file stats.
   */
  stat,

}

module.exports = { procedures }
