import { TextField, InputAdornment, Button } from '@mui/material'
import { useState } from 'react'
import { ForumReplyEmoji, Emoji } from './ForumReplyEmoji'
import { useAuth } from '../../context/AuthContext'
import { useAppActions } from '../../hooks/redux'

type CommentDraftProps = {
  topicId: number
  label?: string
}

export const CommentDraft = ({
  topicId,
  label,
}: CommentDraftProps): JSX.Element => {
  const { user } = useAuth()
  const { createForumMessageAction, getForumMessages } = useAppActions()
  const [value, setValue] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleCreateMessage = () => {
    if (user.data) {
      createForumMessageAction({
        data: {
          topicId,
          ownerId: user.data.id!,
          nickName:
            user.data.display_name! ||
            `${user.data.first_name} ${user.data.second_name}`,
          message: value,
        },
        onSuccess: () => {
          setValue('')
          getForumMessages({ topicId })
        },
      })
    }
  }

  const onChangeEmoji = (emoji: Emoji) => {
    setValue(value + ' ' + emoji.html)
  }

  return (
    <TextField
      value={value}
      sx={{ margin: '6px', width: 'calc(100% - 12px)' }}
      label={label || 'Write here your reply'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <ForumReplyEmoji onChange={onChangeEmoji} />
            <Button
              sx={{ marginLeft: '6px' }}
              variant="outlined"
              color="primary"
              disabled={!value}
              onClick={handleCreateMessage}>
              Send
            </Button>
          </InputAdornment>
        ),
        onChange,
      }}
    />
  )
}
