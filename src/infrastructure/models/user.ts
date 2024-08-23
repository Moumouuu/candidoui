import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Candidate from '#models/candidate'
import Recruiter from '#models/recruiter'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare first_name: string

  @column()
  declare last_name: string

  @column()
  declare role: number

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @hasOne(() => Candidate, { foreignKey: 'user_id' })
  declare candidate: HasOne<typeof Candidate>

  @hasOne(() => Recruiter, { foreignKey: 'user_id' })
  declare recruiter: HasOne<typeof Recruiter>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
