const middleware = {}

middleware['authenticated'] = require('../middleware/authenticated.js')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

middleware['clearNotification'] = require('../middleware/clearNotification.js')
middleware['clearNotification'] = middleware['clearNotification'].default || middleware['clearNotification']

export default middleware
