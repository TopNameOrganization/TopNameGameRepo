import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material'
import { GeneralLayout } from '../layouts'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import { ROUTES } from '../constants'
import { Link } from 'react-router-dom'
import { useAppActions, useAppSelector } from '../hooks/redux'
import { useEffect, useMemo, useState } from 'react'
import ForumListCard from '../components/forum/ForumListCard'

export const ForumListPage = () => {
  const { getForumTopics } = useAppActions()
  const { topics: data } = useAppSelector(state => state.forumTopicReducer)

  const [search, setSearch] = useState<string>('')

  const handleSearchChange = (event: React.ChangeEvent<any>) => {
    setSearch(event.target.value)
  }

  const filteredData = useMemo(() => {
    return data.filter(
      el => el.title.includes(search) || el.shortDescription?.includes(search)
    )
  }, [data, search])

  useEffect(() => {
    getForumTopics()
  }, [])

  return (
    <GeneralLayout>
      <Container sx={{ margin: '0 auto' }} maxWidth="sm">
        <Stack spacing={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}>
            <TextField
              label="Search forum topics"
              fullWidth
              value={search}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              component={Link}
              to={ROUTES.forumCreate}
              variant="outlined"
              color="primary"
              sx={{ minWidth: '200px', ml: 1 }}>
              <AddIcon />
              Create topic
            </Button>
          </Box>
          <Box>
            <Grid container item direction={'column'} spacing={2}>
              {filteredData.map(cardTopic => (
                <Grid item key={cardTopic.id}>
                  <ForumListCard
                    id={cardTopic.id!}
                    nickName={cardTopic.nickName}
                    title={cardTopic.title}
                    shortDescription={cardTopic.shortDescription}
                    likes={cardTopic.likes}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </GeneralLayout>
  )
}
