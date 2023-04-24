export type CreateTopicRequest = {
  id?: number
  nickName: string
  title: string
  avatarUrl?: string
  shortDescription?: string
  message?: string
  likes: number[]
}

export type CreateMessageRequest = {
  id?: number
  topicId: number
  ownerId: number
  nickName: string
  message: string
}

export type Theme = 'light' | 'dark'

export type CreateThemeRequest = {
  id?: number
  theme: Theme
  userId: number
}
