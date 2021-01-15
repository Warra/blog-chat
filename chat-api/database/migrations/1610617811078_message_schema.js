'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.increments()
      table.integer('user_id')
      table.integer('group_id')
      table.text('message')
      table.timestamps()
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessageSchema
