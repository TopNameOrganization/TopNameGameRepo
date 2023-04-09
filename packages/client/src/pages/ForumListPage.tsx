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
import ForumListCard from '../components/forum/ForumListCard'
import AddIcon from '@mui/icons-material/Add'
import { ROUTES } from '../constants'
import { Link } from 'react-router-dom'

const tempData = [
  {
    id: 1,
    nickName: 'Первый комментатор',
    avatarUrl: '',
    title: 'topic',
    shortDescription:
      'Допустим здесь будет выводиться какое-то количество текста из описания топика. При нажатии на эту карточку будет открыться страница, с полным описанием и деревом комментариев, надо не забыть сделать в формочке отдельно инпут для описания, отдельный для тайтла',
  },
  {
    id: 2,
    nickName: 'Самый добрый комментатор',
    avatarUrl: '',
    title: 'topic2',
    shortDescription:
      '1. Нужно сделать кликабельную карточку 2. Счетчики комментариев и лайков 3.Компонент для DetailPage 4.Хедер - закрепить, футер перекрывает 3 карточку 5. Поправить верстку для этой страницы (задать высоту карточке, чтобы ограничить shortDescription)',
  },
  // {
  //   id: 3,
  //   nickName: 'Olya',
  //   avatarUrl: '',
  //   title: 'topic3',
  //   shortDescription:
  //     'По менюшке с тремя точками наверное можно сделать открыть, оставить комментарий или вообще убрать ее',
  // },
]

export const ForumListPage = () => {
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
              {tempData.map(cardTopic => (
                <Grid item key={cardTopic.id}>
                  <ForumListCard
                    id={cardTopic.id}
                    nickName={cardTopic.nickName}
                    title={cardTopic.title}
                    shortDescription={cardTopic.shortDescription}
                    avatarUrl={cardTopic.avatarUrl}
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
