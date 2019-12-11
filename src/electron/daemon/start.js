/**
 * Start the backend daemon by loading the preferences and listening frontside.
 */
// const preferences = require('./preferences')
const stdin = require('./stdin')

const run = () => {
  // @TODO: Is the store needed here anymore now that it is loaded in the listen function?
  // // Load the preferences
  // store = preferences.load()

  // Listen to the renderer for commands to save/load preferences.
  // preferences.listen()

  // Listen to the renderer for commands to run on the remote server.
  stdin.listen()
}

module.exports = { run }
