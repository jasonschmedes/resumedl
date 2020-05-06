/**
 * List the files on the remote machine.
 */
const { executeProcedure } = require('../socket')

const command = async (transport, downloads, dir, sort = 'name', direction = 'asc') => {
  console.log('LS Transport', transport)
  console.log('LS downloads', downloads)
  const env = {
    REMOTEDL_LS_DIR: dir,
    REMOTEDL_LS_SORT: sort,
    REMOTEDL_LS_DIRECTION: direction,
  }

  return executeProcedure(transport, env, 'ls')
}

module.exports = { command }
