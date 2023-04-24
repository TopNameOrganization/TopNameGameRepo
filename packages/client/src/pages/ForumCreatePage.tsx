import { Box, Button, Container, Stack, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants'
import { GeneralLayout } from '../layouts'
import { useState } from 'react'
import { useAppActions } from '../hooks/redux'
import { useAuth } from '../context/AuthContext'

export const ForumCreatePage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { createForumTopicAction } = useAppActions()
  const [title, setTitle] = useState<string>('')
  const [shortDescription, setShortDescription] = useState<string>('')

  const handleSetTitle = (event: React.ChangeEvent<any>) => {
    setTitle(event.target.value)
  }
  const handleSetMessage = (event: React.ChangeEvent<any>) => {
    setShortDescription(event.target.value)
  }

  const handleCreateTopic = () => {
    createForumTopicAction({
      data: {
        title,
        shortDescription,
        nickName:
          user.data?.display_name ||
          `${user.data?.first_name} ${user.data?.second_name}`,
        likes: [],
      },
      onSuccess: () => navigate(ROUTES.forum),
    })
  }

  return (
    <GeneralLayout>
      <Container sx={{ margin: '0 auto' }} maxWidth="sm">
        <Stack spacing={1}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}>
            <TextField
              fullWidth
              label="Write here title"
              variant="outlined"
              value={title}
              onChange={handleSetTitle}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              multiline
              rows={23}
              label="Write here message"
              variant="outlined"
              value={shortDescription}
              onChange={handleSetMessage}
            />
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="primary"
              disabled={!title || !shortDescription}
              onClick={handleCreateTopic}>
              Publish
            </Button>
            <Button
              component={Link}
              to={ROUTES.forum}
              variant="outlined"
              color="primary">
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Container>
    </GeneralLayout>
  )
}
