import {
  Model,
  Table,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript'
import { CreateTopicRequest } from './types'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'topic',
})
export class Topic extends Model<CreateTopicRequest> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    field: 'id',
  })
  override id: number

  @Column({
    type: DataType.STRING,
    field: 'nickName',
  })
  nickName: string

  @Column({
    type: DataType.STRING,
    field: 'title',
  })
  title: string

  @Column({
    type: DataType.STRING,
    field: 'shortDescription',
  })
  shortDescription: string

  @Column({
    type: DataType.STRING,
    field: 'message',
  })
  message: string

  @Column({
    type: DataType.STRING,
    field: 'avatarUrl',
  })
  avatarUrl: string

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    field: 'likes',
  })
  likes: number[]
}
