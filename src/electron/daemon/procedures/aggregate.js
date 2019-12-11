/**
 * Expose the daemon's API.
 */
const { command: dl } = require('./dl/command')
const { command: ls } = require('./ls/command')

const procedures = {

  /**
   * Download a file.
   */
  dl,

  /**
   * List the files.
   */
  ls,

}

module.exports = { procedures }
