import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants'
import { GeneralLayout } from '../layouts'

export const ForumCreatePage = () => {
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
            <TextField fullWidth label="Write here title" variant="outlined" />
          </Box>
          <Box>
            <TextField
              fullWidth
              multiline
              rows={23}
              label="Write here message"
              variant="outlined"
            />
          </Box>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" color="primary">
              Publish
            </Button>
            <Button component={Link}
            to={ROUTES.forum} variant="outlined" color="primary">
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Container>
    </GeneralLayout>
  )
}
