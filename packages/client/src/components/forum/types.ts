export enum CommentType {
  FAIR = 'fair',
  DRAFT = 'draft',
}

export type ICommentFair = {
  type: CommentType.FAIR
  id: string
  author: {
    id: number;
    name: string
    avatar: string
  }
  created_at: string
  text: string
  replies: IComment[]
  isRemoved?: boolean
}

export type ICommentDraft = {
  type: CommentType.DRAFT
  id: string
}

export type IComment = ICommentFair | ICommentDraft

export type OnReply = (data: ICommentFair) => unknown
export type OnRemove = (data: ICommentFair) => unknown
export type OnReplySubmit = ({
  comment,
  value,
}: {
  comment: ICommentDraft
  value: string
}) => unknown
