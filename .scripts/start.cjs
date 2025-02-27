const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

// Path to the JSON file
const jsonFilePath = path.resolve(__dirname, '../.vercel/react-router-build-result.json')

// Read and parse the JSON file
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the JSON file:', err)
    process.exit(1)
  }

  try {
    const buildResult = JSON.parse(data)
    const serverBundles = buildResult.buildManifest.serverBundles

    // Assuming you want to start the first server bundle found
    const firstBundleKey = Object.keys(serverBundles)[0]
    const serverBundle = serverBundles[firstBundleKey]
    const serverFilePath = path.resolve(__dirname, '../', serverBundle.file)

    // Start the server and pipe output to the CLI
    const serverProcess = spawn('react-router-serve', [serverFilePath], { stdio: 'inherit' })

    serverProcess.on('error', (err) => {
      console.error('Error starting the server:', err)
    })

    serverProcess.on('close', (code) => {
      console.log(`Server process exited with code ${code}`)
    })
  } catch (parseError) {
    console.error('Error parsing the JSON file:', parseError)
    process.exit(1)
  }
})
