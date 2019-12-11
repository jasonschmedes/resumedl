/**
 * Aggregate all the config into a single config object.
 */

//
// Configurations to include in the aggregation.
//
const { config: app } = require('./app')

//
// The master config object that will be exported.
//
const config = {
  app,
}

module.exports = { config }
