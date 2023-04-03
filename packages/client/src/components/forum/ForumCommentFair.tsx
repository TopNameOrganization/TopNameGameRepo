import ReplyIcon from '@mui/icons-material/Reply'
import { ICommentFair, OnReply } from './types'
import styles from './ForumCommentFair.module.css'
import classNames from 'classnames'

export type CommentFairProps = {
  comment: ICommentFair
  className?: string
  onReply: OnReply
}

export const CommentFair = ({
  comment,
  className,
  onReply,
}: CommentFairProps): JSX.Element => {
  return (
    <div className={classNames(className, styles.root)}>
      <div style={{ display: 'flex', gap: '10px' }} className={styles.header}>
        <img
          className={styles.img}
          src={comment.author.avatar}
          alt={comment.author.avatar}
        />
        <div>{comment.author.name}</div>
        <div className={styles.relativeTime}>{comment.created_at}</div>
      </div>
      <div>{comment.text}</div>
      <div className={styles.reply} onClick={() => onReply(comment)}>
        <ReplyIcon fontSize={'small'} />
        <span>Reply</span>
      </div>
    </div>
  )
}
