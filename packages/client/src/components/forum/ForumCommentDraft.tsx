import { TextField, InputAdornment, Button } from '@mui/material'
import { useState, SyntheticEvent } from 'react'
import { ICommentDraft, OnReplySubmit } from './types'

type CommentDraftProps = {
  comment: ICommentDraft
  onReplySubmit: OnReplySubmit
}

export const CommentDraft = ({
  comment,
  onReplySubmit,
}: CommentDraftProps): JSX.Element => {
  const [value, setValue] = useState('')

  const onChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <TextField
      sx={{ margin: '6px', width: 'calc(100% - 12px)' }}
      label="Write here your reply"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
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
