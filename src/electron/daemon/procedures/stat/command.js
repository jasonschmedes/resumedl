/**
 * List the files on the remote machine.
 */
const { executeProcedure } = require('../socket')

const command = async (transport, downloads, file) => {
  console.log('LS Transport', transport)
  console.log('LS downloads', downloads)
  const env = { REMOTEDL_STAT_FILE: file }

  return executeProcedure(transport, env, 'stat')
}

module.exports = { command }
