import { Fragment } from 'react'
import { CommentDraft } from './ForumCommentDraft'
import { CommentFair } from './ForumCommentFair'
import styles from './ForumComments.module.css'
import { IComment, OnReply, OnReplySubmit, CommentType } from './types'

type CommentsProps = {
  comments: IComment[]
  className?: string
  onReply: OnReply
  onReplySubmit: OnReplySubmit
}

export const Comments = ({
  comments,
  className,
  onReply,
  onReplySubmit,
}: CommentsProps): JSX.Element => {
  if (!comments?.length) {
    return null!
  }

  const getCommentByType = (comment: IComment): JSX.Element => {
    switch (comment.type) {
      case CommentType.FAIR:
        return (
          <Fragment key={comment.id}>
            <CommentFair
              comment={comment}
              className={styles.comment}
              onReply={onReply}
            />
            <Comments
              comments={comment.replies}
              className={styles.comments}
              onReply={onReply}
              onReplySubmit={onReplySubmit}
            />
          </Fragment>
        )

      case CommentType.DRAFT:
        return (
          <CommentDraft
            key={comment.id}
            comment={comment}
            onReplySubmit={onReplySubmit}
          />
        )
    }
  }

  return (
    <div className={className}>
      {comments.map(comment => getCommentByType(comment))}
    </div>
  )
}
