import AddReactionIcon from '@mui/icons-material/AddReaction'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Tooltip from '@mui/material/Tooltip'
import { useState } from 'react'
import styles from './ForumReplyEmoji.module.css';

type CommentDraftProps = {
  onChange: (emoji: Emoji) => unknown
}

const emojiListCodes = ['1F604', '1F60D', '1F621', '1F622', '1F624', '1F633']

const emojiList: Emoji[] = emojiListCodes.map((code) => ({
  html: String.fromCodePoint(parseInt(code, 16)),
  code,
}));

export type Emoji = {
  code: string;
  html: string;
}

export const ForumReplyEmoji = ({
  onChange,
}: CommentDraftProps): JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Tooltip
        open={open}
        disableHoverListener
        onClose={() => setOpen(false)}
        title={
          <div onClick={e => e.stopPropagation()} className={styles.list}>
            {emojiList.map(emoji => (
              <div
                key={emoji.code}
                className={styles.emoji}
                dangerouslySetInnerHTML={{ __html: emoji.html }}
                onClick={() => onChange(emoji)}
              />
            ))}
          </div>
        }>
        <AddReactionIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => setOpen(true)}
        />
      </Tooltip>
    </ClickAwayListener>
  )
}
