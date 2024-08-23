import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recruiters'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('company_name')
      table.string('sector_of_activity').nullable()
      table.string('location')
      table.integer('user_id').unsigned().references('users.id').onDelete('cascade') // delete recruiter when user is deleted
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
