import {
  Model,
  Table,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript'
import { CreateMessageRequest } from './types'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'message',
})
export class Message extends Model<CreateMessageRequest> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    field: 'id',
  })
  override id: number

  @Column({
    type: DataType.STRING,
    field: 'message',
  })
  message: string

  @Column({
    type: DataType.INTEGER,
    field: 'topicId',
  })
  topicId: number

  @Column({
    type: DataType.STRING,
    field: 'nickName',
  })
  nickName: string

  @Column({
    type: DataType.INTEGER,
    field: 'ownerId',
  })
  ownerId: number
}
