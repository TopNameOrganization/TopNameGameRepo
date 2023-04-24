import {
  Model,
  Table,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
  Unique,
} from 'sequelize-typescript'
import type { CreateThemeRequest, Theme as ThemeType } from './types'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'theme',
})
export class Theme extends Model<CreateThemeRequest> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    field: 'id',
  })
  override id: number

  @Column({
    type: DataType.STRING,
    field: 'theme',
  })
  theme: ThemeType

  @Unique
  @Column({
    type: DataType.INTEGER,
    field: 'userId',
  })
  userId: number
}
