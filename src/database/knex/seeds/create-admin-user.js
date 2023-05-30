/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { hash } = require('bcryptjs')

exports.seed = async function (knex) {
  // create admin user
  await knex('users').insert([
    {
      name: 'admin',
      email: 'admin@mail.com',
      password: await hash('1234', 8),
      is_admin: true,
    },
  ])
}
