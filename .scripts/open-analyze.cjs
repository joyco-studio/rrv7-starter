const child_process = require('child_process')
const os = require('os')
const path = require('path')

const MS = 'microsoft'

function ensureCommander(platform) {
  switch (platform) {
    case 'linux': {
      if (os.release().toLocaleLowerCase().indexOf(MS) !== -1) {
        return ['win32', 'cmd.exe']
      }
      return ['linux', 'xdg-open']
    }
    case 'win32':
      return ['win32', 'cmd.exe']
    case 'darwin':
      return ['darwin', 'open']
    default:
      return [platform, 'xdg-open']
  }
}

function opener(argvs) {
  const [platform, command] = ensureCommander(os.platform())

  // https://stackoverflow.com/questions/154075/using-the-start-command-with-parameters-passed-to-the-started-program/154090#154090
  if (platform === 'win32') {
    argvs = argvs.map((arg) => arg.replace(/[&^]/g, '^$&'))
    argvs = ['/c', 'start', '""'].concat(argvs)
  }

  return child_process.spawn(command, argvs)
}

const statsPath = path.resolve(__dirname, '../build/client/stats.html')

console.log(statsPath)

opener([statsPath])
