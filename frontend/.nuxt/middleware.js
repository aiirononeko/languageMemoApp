const middleware = {}

middleware['clearNotification'] = require('../middleware/clearNotification.js')
middleware['clearNotification'] = middleware['clearNotification'].default || middleware['clearNotification']

middleware['isAuthenticated'] = require('../middleware/isAuthenticated.js')
middleware['isAuthenticated'] = middleware['isAuthenticated'].default || middleware['isAuthenticated']

export default middleware
