import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { blue } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { ROUTES } from '../../constants'
import { Link } from 'react-router-dom'
import { useAppActions } from '../../hooks/redux'
import { useAuth } from '../../context/AuthContext'

interface FormListCardProps {
  id: number
  nickName: string
  title: string
  shortDescription?: string
  likes: number[]
}

const FormListCard = ({
  id,
  nickName,
  title,
  shortDescription = '',
  likes,
}: FormListCardProps) => {
  const { user } = useAuth()
  const { likeForumTopicAction, getForumTopics, getForumTopic } =
    useAppActions()

  const onFavorite = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (user.data?.id) {
      likeForumTopicAction({
        data: { topicId: id, ownerId: user.data?.id },
        onSuccess: () => {
          getForumTopics()
          getForumTopic({ id })
        },
      })
    }
  }

  const avatarDummy = React.useMemo(() => {
    const nickArr = nickName.split(' ')
    const name =
      nickArr.length === 2
        ? `${nickArr[0][0]}${nickArr[1][0]}`
        : `${nickArr[0][0]}${nickArr[0][1]}`
    return name.toLocaleUpperCase()
  }, [])

  const color = user.data?.id && likes.includes(user.data?.id) ? 'red' : 'gray'

  return (
    <Link to={`${ROUTES.forum}/${id}`} style={{ textDecoration: 'none' }}>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
              {avatarDummy}
            </Avatar>
          }
          title={title}
          subheader={nickName}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {shortDescription}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={onFavorite}>
            <FavoriteIcon sx={{ color }} />
          </IconButton>
        </CardActions>
      </Card>
    </Link>
  )
}

export default FormListCard
