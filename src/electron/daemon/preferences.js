/**
 * Interact with the various configurations.
 *
 * The application has built in configuration defaults. It also makes use of
 * OS user data to allow options changed by the user to persist.
 */
const Store = require('electron-store')

const store = new Store()

/**
 * Get the store object.
 */
const getStore = () => {
  return store
}

/**
 * Get the running config store by loading user data or the defaults.
 */
const load = () => {
  preferences = store.get('preferences')
  console.log('Loading preferences', preferences)

  return preferences
}

/**
 * Save the preferences to the config store.
 */
const save = (preferences) => {
  console.log('Saving preferences', preferences)
  store.set('preferences', preferences)
}

module.exports = { getStore, load, save }
