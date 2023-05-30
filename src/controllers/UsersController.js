const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const knex = require('../database/knex')

class UsersController {
  async index(request, response) {
    const allUsers = await knex('users').select()

    return response.status(200).json(allUsers)
  }

  async create(request, response) {
    const { name, email, password } = request.body

    if (!name) {
      throw new AppError('Name is required', 401)
    }
    if (!email) {
      throw new AppError('email is required', 401)
    }
    if (!password) {
      throw new AppError('Password are required', 401)
    }

    const checkIfUserExists = await knex('users').where({ email }).first()

    if (checkIfUserExists) {
      throw new AppError('E-mail already in use', 401)
    }

    const hashedPassword = await hash(password, 8)

    await knex('users').insert({ name, email, password: hashedPassword })

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id

    const user = await knex('users').where({ id: user_id }).first()

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const userWithUpdatedEmail = await knex('users').where({ email }).first()

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('E-mail already in use', 401)
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('Old passoword is invalid', 401)
      }

      user.password = await hash(password, 8)
    }

    await knex('users').where({ id: user_id }).update({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    await knex('users')
      .where({ id: user_id })
      .update('updated_at', knex.fn.now())

    return response.status(200).json()
  }

  async delete(request, response) {
    const { id } = request.params

    const userExists = await knex('users').where({ id }).select()

    if (userExists.length === 0) {
      throw new AppError('User does not exist', 404)
    }

    await knex('users').where({ id }).del()

    return response.status(200).json()
  }
}

module.exports = UsersController
