/**
 * The transport layer data transfer mechanism for running remote commands.
 */
const fs = require('fs').promises
const path = require('path')
const util = require('util')

const node_ssh = require('node-ssh')
const Rsync = require('rsync')

const ssh = new node_ssh()

let rsyncPid

/**
 * Download a remote file source to the destination.
 *
 * transport - The remote connection config.
 * downloads - The config of where to look for and where to download files to.
 * source - The absolute path of the file to download.
 */
const executeDownload = async (transport, downloads, source) => {
  const rsh = `ssh -p${transport.port}`
  const rsync = new Rsync()
    .set('rsh', rsh) // the app uses ssh on a specific port.
    .set('partial-dir', downloads.partials) // save partial dl's here.
    .flags('L') // --copy-links: Download the actual file and not a symlink.
    .recursive() // do the entire directory if it is a directory
    .source(`${transport.username}@${transport.host}:"${source}"`)
    .destination(downloads.complete)

  console.log('Rsync Command:', rsync.command())

  // Promisify the execute function so we can use await.
  // rsync.execute(function(error, code, cmd) {
  //   console.log('Executed the rsync command', error, code, cmd)
  // })
  // rsync.executeAsync = promisify(rsync.execute)

  // rsync.execute returns the crucial rsyncPid so use a custom promisify.
  rsync.execute[util.promisify.custom] = () => {
    return new Promise((resolve) => {
      rsyncPid = rsync.execute(resolve)
    })
  }
  rsync.executeAsync = util.promisify(rsync.execute)

  let status
  try {
    status = true
    rsyncPid = await rsync.executeAsync()
  }
  catch (e) {
    status = false
    console.log('Error executing rsync:', e)
  }

  return status
}

/**
 * Cancel a download in progress.
 */
const stopDownload = () => {
  if (rsyncPid) {
    try {
      console.log('Killing rsync.')
      rsyncPid.kill()
    }
    catch (e) {
      console.log('PID is stale.')
    }
  }
}

/**
 * Connect to a remote machine and run a script.
 *
 * The script comes from './scripts/<command>.py'. Variables are passed as
 * environment variables. The response dumps JSON to stdout. For example:
 *
 *    REMOTEDL_LS_DIR="${dir}" python3 -c"${script}"
 *
 */
const executeProcedure = async (transport, env, procedure) => {
  let stdout
  try {
    const command = terraformCommand(env, 'python3')
    const script = await readProcedure(procedure)
    console.log('Remote Command: ', command, ['-c', script])
    await ssh.connect(transport)
    stdout = ssh.exec(command, ['-c', script])
  }
  catch (e) {
    console.log('Remote command failed:', procedure, e)
  }

  return stdout
}

/**
 * Load a script source for the given procedure.
 *
 * procedure - The name of the folder in procedures/ containing the script.
 */
const readProcedure = async (procedure) => {
  const source = path.join(__dirname, `${procedure}`, 'script.py')

  return fs.readFile(source, 'utf8')
}

/**
 * Prepend a command with environment variables.
 *
 * env - An array of environment variable names and values.
 * command - The command to add the environment variables to.
 */
const terraformCommand = (env, command) => {
  const out = []

  for (const name in env) {
    out.push(`${name}="${env[name]}"`)
  }

  console.log('ENV', env)
  console.log('terraformed', `${out.join(' ')} ${command}`)

  return `${out.join(' ')} ${command}`
}

module.exports = { executeDownload, executeProcedure, stopDownload }
