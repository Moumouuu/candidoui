import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'candidates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('portfolio_link').nullable()
      table.string('cv').nullable()
      table.string('location').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')

      // relations
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE') // delete candidate when user is deleted
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
