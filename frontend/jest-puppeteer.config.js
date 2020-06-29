module.exports = {
  launch: {
    headless: false,
    slowMo: 250
  },
  server: {
    command: 'npm run test:server',
    port: 3030,
    launchTimeout: 50000
  }
}
