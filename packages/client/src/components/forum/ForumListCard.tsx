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
import CommentIcon from '@mui/icons-material/Comment'
import { ROUTES } from '../../constants'
import { Link } from 'react-router-dom'

interface FormListCardProps {
  id: number
  nickName: string
  avatarUrl?: string
  title: string
  shortDescription?: string
}

const FormListCard = ({
  id,
  nickName,
  avatarUrl = '',
  title,
  shortDescription = '',
}: FormListCardProps) => {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const onFavorite = (event: React.SyntheticEvent) => {
    event.preventDefault()
  }

  const onComment = (event: React.SyntheticEvent) => {
    event.preventDefault()
  }

  return (
    <Link to={ROUTES.forumDetail} style={{ textDecoration: 'none' }}>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
              LR
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
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="comment" onClick={onComment}>
            <CommentIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Link>
  )
}

export default FormListCard
