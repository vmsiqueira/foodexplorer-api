/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable('carts', (table) => {
    table.increments('id')
    table.integer('user_id').references('id').inTable('users')
    table.text('status')
    table.text('payment_method')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('carts')
