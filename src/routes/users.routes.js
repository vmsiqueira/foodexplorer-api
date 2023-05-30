const { Router } = require('express')

const UsersController = require('../controllers/UsersController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.get('/', usersController.index)
usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.delete('/:id', usersController.delete)

module.exports = usersRoutes
