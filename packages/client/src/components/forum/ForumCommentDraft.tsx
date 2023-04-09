import { TextField, InputAdornment, Button } from '@mui/material'
import { useState } from 'react'
import { ICommentDraft, OnReplySubmit } from './types'
import { ForumReplyEmoji, Emoji } from './ForumReplyEmoji'

type CommentDraftProps = {
  comment: ICommentDraft
  onReplySubmit: OnReplySubmit
  label?: string;
}

export const CommentDraft = ({
  comment,
  onReplySubmit,
  label,
}: CommentDraftProps): JSX.Element => {
  const [value, setValue] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const onChangeEmoji = (emoji: Emoji) => {
    console.log('onChangeEmoji', emoji);
    console.log({ emoji });
    setValue(value + ' ' + emoji.html);
  };

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
              onClick={() => onReplySubmit({ comment, value })}>
              Send
            </Button>
          </InputAdornment>
        ),
        onChange,
      }}
    />
  )
}
