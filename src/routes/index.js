const { Router } = require('express')

const sessionsRoutes = require('./sessions.routes')
const usersRoutes = require('./users.routes')
const dishesRoutes = require('./dishes.routes')
const cartsRoutes = require('./cart.routes')

const routes = Router()

// routes
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/dishes', dishesRoutes)
routes.use('/carts', cartsRoutes)

module.exports = routes
