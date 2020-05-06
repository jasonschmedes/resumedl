/**
 * Create the desktop window and load the application in it.
 *
 * This makes the application behave like most desktop applications for the OS.
 */
const process = require('process')

const { app, BrowserWindow } = require('electron')

const start = require('./daemon/start')
const { stopDownload } = require('./daemon/procedures/socket')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit()
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Environment variables like NODE_ENV aren't available so check for
// electron-prebuilt in the execPath to determine the environment.
const production = process.execPath.search('electron-prebuilt') === -1;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    // Start the window at 720p
    width: 1280,
    height: 720,

    // Include Node.
    webPreferences: {
      nodeIntegration: true,
    },
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/../../dist/index.html`)

  // Open the DevTools in development.
  if ( ! production) {
    mainWindow.webContents.openDevTools()
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

const initialize = () => {
  // See issue https://github.com/electron/electron/issues/18397.
  app.allowRendererProcessReuse = true

  // Start the backend daemon.
  start.run()

  // Show the main window when the app starts.
  createWindow()
}

const run = () => {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', initialize)

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow()
    }
  })

  app.on('before-quit', () => {
    // Stop downloads before quitting.
    stopDownload()
  })
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

module.exports = { run }
