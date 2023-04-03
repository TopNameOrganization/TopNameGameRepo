export enum CommentType {
  FAIR = 'fair',
  DRAFT = 'draft',
}

export type ICommentFair = {
  id: string
  author: {
    name: string
    avatar: string
  }
  created_at: string
  text: string
  replies: IComment[]
  type: CommentType.FAIR
}

export type ICommentDraft = {
  id: string
  type: CommentType.DRAFT
}

export type IComment = ICommentFair | ICommentDraft

export type OnReply = (data: ICommentFair) => unknown
export type OnReplySubmit = ({
  comment,
  value,
}: {
  comment: ICommentDraft
  value: string
}) => unknown
