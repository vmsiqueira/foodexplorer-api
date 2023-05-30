const { Router } = require('express')

const CartsController = require('../controllers/CartsController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const ensureUserIsAdmin = require('../middlewares/ensureUserIsAdmin')

const cartsRoutes = Router()
const cartsController = new CartsController()

cartsRoutes.use(ensureAuthenticated)

cartsRoutes.post('/', cartsController.create)
cartsRoutes.get('/:id', cartsController.show)
cartsRoutes.get('/', ensureUserIsAdmin, cartsController.index)
cartsRoutes.delete('/:id', cartsController.delete)
cartsRoutes.put('/', cartsController.update)

module.exports = cartsRoutes
