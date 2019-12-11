/**
 * Download a file from the remote machine.
 */
const { executeDownload } = require('../socket')

/**
 * An IPC command for downloading a file.
 *
 * transport - The config for connecting to the remote server.
 * downloads - The config for where to look for and save files.
 * source - The absolute path of the file to download.
 */
const command = async (transport, downloads, source) => {
  return executeDownload(transport, downloads, source)
}

module.exports = { command }
