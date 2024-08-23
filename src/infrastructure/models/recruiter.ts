import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Recruiter extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare company_name: string

  @column()
  declare sector_of_activity: string | null

  @column()
  declare user_id: number

  @column()
  declare location: string

  @column()
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
