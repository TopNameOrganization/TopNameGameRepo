import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  CardActions,
  Box,
  Paper,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material'
import { blue } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'
import { GeneralLayout } from '../layouts'
import styles from './ForumDetailPage.module.css'
import { useState } from 'react'
import {
  CommentType,
  IComment,
  ICommentDraft,
  ICommentFair,
  OnReply,
  OnReplySubmit,
} from '../components/forum/types'
import { Comments } from '../components/forum/ForumComments'

const tempData = {
  id: 1,
  nickName: 'Первый комментатор',
  avatarUrl: '',
  title: 'topic',
  shortDescription:
    'Допустим здесь будет выводиться какое-то количество текста из описания топика. При нажатии на эту карточку будет открыться страница, с полным описанием и деревом комментариев, надо не забыть сделать в формочке отдельно инпут для описания, отдельный для тайтла',
}

const sampleComment = {
  author: {
    name: 'John Lock',
    avatar:
      'https://leonardo.osnova.io/133d39cc-fe54-8af6-a298-7e3d9368cb8e/-/scale_crop/64x64/-/format/webp/',
  },
  created_at: '5 часов назад',
  text: `Тратить бумагу на каждый постер или повесить один дисплей где будет сменяться картинка каждые несколько минут?`,
  replies: [],
  type: CommentType.FAIR as const,
}

const getId = () => '' + Date.now() + Math.random()

const commentData: IComment[] = Array.from({ length: 3 }, (v, index) => ({
  ...sampleComment,
  id: getId(),
  replies: Array.from({ length: 5 }, (v, k) => ({
    ...sampleComment,
    id: getId(),
  })),
}))

console.log('commentData', commentData)

const insertDraft = (comments: IComment[], place: ICommentFair): IComment[] => {
  const result: IComment[] = []

  comments.forEach(comment => {
    const nextComment = {
      ...comment,
    }

    if (nextComment.type === CommentType.FAIR) {
      if (nextComment.id === place.id) {
        const draft: ICommentDraft = {
          type: CommentType.DRAFT,
          id: getId(),
        }

        const firstReply = nextComment.replies[0]
        const nextReplies: IComment[] = [...nextComment.replies]

        if (firstReply?.type !== CommentType.DRAFT) {
          nextReplies.unshift(draft)
        }

        nextComment.replies = nextReplies
      } else {
        nextComment.replies = insertDraft(nextComment.replies, place)
      }
    }

    result.push(nextComment)
  })

  return result
}

const insertFair = (
  comments: IComment[],
  draft: ICommentDraft,
  value: string
): IComment[] => {
  const result: IComment[] = []

  comments.forEach(comment => {
    const nextComment = {
      ...comment,
    }

    if (nextComment.type === CommentType.FAIR) {
      const nextReplies = insertFair(nextComment.replies, draft, value)
      const firstReply = nextComment.replies[0]

      if (
        firstReply &&
        firstReply.type === CommentType.DRAFT &&
        firstReply.id === draft.id
      ) {
        const fair: ICommentFair = {
          ...sampleComment,
          text: value,
          id: getId(),
        }

        nextReplies.splice(0, 1, fair)
      }

      nextComment.replies = nextReplies
    }

    result.push(nextComment)
  })

  return result
}

export const ForumDetailPage = () => {
  const [comments, setComments] = useState(commentData)

  const onReply: OnReply = data => {
    const nextComments = insertDraft(comments, data)

    setComments(nextComments)
  }

  const onReplySubmit: OnReplySubmit = ({ comment, value }) => {
    const nextComments = insertFair(comments, comment, value)

    setComments(nextComments)
  }

  return (
    <GeneralLayout>
      <Box
        maxWidth="sm"
        sx={{
          margin: '10px auto',
        }}>
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                LR
              </Avatar>
            }
            action={
              <IconButton
                component={Link}
                to={ROUTES.forumDetail}
                aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={tempData.title}
            subheader={tempData.nickName}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {tempData.shortDescription}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Box>
      <Box maxWidth="sm" sx={{ margin: '0 auto' }}>
        <Paper sx={{ padding: '6px' }}>
          <h4>2 комментария</h4>
          <TextField
            fullWidth
            label="Write here your comment"
            // multiline
            // rows={4}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="outlined" color="primary">
                    Send
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          <Comments
            comments={comments}
            onReply={onReply}
            onReplySubmit={onReplySubmit}
            className={styles.commentsRoot}
          />
        </Paper>
      </Box>
    </GeneralLayout>
  )
}
