module.exports = {
  launch: {
    headless: true,
    slowMo: 250
  },
  server: {
    command: 'npm run test:server',
    port: 3030,
    launchTimeout: 50000
  }
}
