import ReplyIcon from '@mui/icons-material/Reply'
import DeleteIcon from '@mui/icons-material/Delete'
import { ICommentFair, OnReply, OnRemove } from './types'
import styles from './ForumCommentFair.module.css'
import classNames from 'classnames'
import { useAuth } from '../../context/AuthContext';

export type CommentFairProps = {
  comment: ICommentFair
  className?: string
  onReply: OnReply
  onRemove: OnRemove
}

export const CommentFair = ({
  comment,
  className,
  onReply,
  onRemove,
}: CommentFairProps): JSX.Element => {
  const auth = useAuth();
  const currentUserId = auth.user.data?.id;

  const { isRemoved } = comment;

  const canRemove = currentUserId === comment.author.id && !isRemoved;

  return (
    <div className={classNames(className, styles.root, { [styles.removed]: isRemoved })}>
      <div style={{ display: 'flex', gap: '10px' }} className={styles.header}>
        <img
          className={styles.img}
          src={comment.author.avatar}
          alt={comment.author.avatar}
        />
        <div>{comment.author.name}</div>
        <div className={styles.relativeTime}>{comment.created_at}</div>
      </div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: isRemoved ? '[ Message deleted ]' : comment.text }}></div>
      <div className={styles.actions}>
        <div className={styles.reply} onClick={() => onReply(comment)}>
          <ReplyIcon fontSize={'small'} />
          <span>Reply</span>
        </div>

        {canRemove && <DeleteIcon className={styles.remove} onClick={() => onRemove(comment)} />}
      </div>
    </div>
  )
}
