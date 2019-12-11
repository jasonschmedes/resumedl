/**
 * List the files on the remote machine.
 */
const { executeProcedure } = require('../socket')

const command = async (transport, downloads, dir) => {
  console.log('LS Transport', transport)
  console.log('LS downloads', downloads)
  const env = { REMOTEDL_LS_DIR: dir }

  return executeProcedure(transport, env, 'ls')
}

module.exports = { command }
