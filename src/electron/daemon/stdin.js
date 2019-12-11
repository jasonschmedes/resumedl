/**
 * Listen for API requests comming from the front end app.
 */
const { ipcMain } = require('electron')

const { procedures } = require('./procedures/aggregate')
const { getStore, load, save } = require('./preferences')
const { stopDownload } = require('./procedures/socket')

/**
 * Listen for commands from the renderer and return a response.
 *
 * Commands:
 *
 *    remote-command-request - Execute a command on the remote machine.
 *    load-store - Load the entire store.
 *    save-store - Overwrite the existing store.
 *    load-session - Retrieve a session value by key.
 *    save-session - Save a session key, value pair.
 */
const listen = () => {
  ipcMain.handle('remote-command-request', async (event, command) => {
    const { procedure, args } = command
    const preferences = load()
    console.log('Loaded Prefs', preferences)
    console.log('Received command: (Remote) ', procedure, args)
    return procedures[procedure](
      preferences.transport,
      preferences.downloads,
      ...args
    )
  })

  ipcMain.handle('load-store', async () => {
    console.log('Received load-store request.')
    return load()
  })

  ipcMain.handle('save-store', async (event, preferences) => {
    console.log('Received save-store request.')
    save(preferences)
  })

  ipcMain.handle('load-session', async (event, key) => {
    console.log('Received load-session request.')
    return getStore().get(key)
  })

  ipcMain.handle('save-session', async (event, key, value) => {
    console.log('Received save-session request.')
    getStore().set(key, value)
  })

  ipcMain.handle('stop-download', async () => {
    console.log('Received stop-download request.')
    stopDownload()
    return true
  })
}

module.exports = { listen }
