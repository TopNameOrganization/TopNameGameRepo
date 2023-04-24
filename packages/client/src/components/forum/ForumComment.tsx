import styles from './ForumComment.module.css'
import { ForumMessageData } from '../../api/types'
import { Avatar } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'

interface Props {
  comment: ForumMessageData
}

export const ForumComment = ({ comment }: Props): JSX.Element => {
  const avatarDummy = React.useMemo(() => {
    const nickArr = (comment.nickName || 'Unknown').split(' ')
    const name =
      nickArr.length === 2
        ? `${nickArr[0][0]}${nickArr[1][0]}`
        : `${nickArr[0][0]}${nickArr[0][1]}`
    return name.toLocaleUpperCase()
  }, [])

  return (
    <div style={{ display: 'flex', gap: '10px' }} className={styles.root}>
      <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
        {avatarDummy}
      </Avatar>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div className={styles.header}>{comment.nickName}</div>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: comment.message }}
        />
      </div>
      {/* <div className={styles.actions}>
        {canRemove && (
          <DeleteIcon className={styles.remove} onClick={handleRemode} />
        )}
      </div> */}
    </div>
  )
}
