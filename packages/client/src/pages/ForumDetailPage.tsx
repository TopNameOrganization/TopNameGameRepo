import { Box, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'
import { GeneralLayout } from '../layouts'
import styles from './ForumDetailPage.module.css'
import { useEffect } from 'react'
import { CommentDraft } from '../components/forum/ForumCommentDraft'
import ForumListCard from '../components/forum/ForumListCard'
import { useAppActions, useAppSelector } from '../hooks/redux'
import { ForumComment } from '../components/forum/ForumComment'

export const ForumDetailPage = () => {
  const { id } = useParams()
  const { getForumTopic, getForumMessages } = useAppActions()
  const { topic } = useAppSelector(state => state.forumTopicByIdReducer)
  const { messages } = useAppSelector(state => state.forumMessagesReducer)

  useEffect(() => {
    if (id) {
      getForumTopic({ id: +id })
      getForumMessages({ topicId: +id })
    }
  }, [])

  if (!topic) return null

  return (
    <GeneralLayout>
      {topic && (
        <Box
          maxWidth="sm"
          sx={{
            margin: '10px auto',
          }}>
          <ForumListCard
            id={topic.id!}
            nickName={topic.nickName}
            title={topic.title}
            shortDescription={topic.shortDescription}
            likes={topic.likes}
          />
        </Box>
      )}

      <Box maxWidth="sm" sx={{ margin: '0 auto' }}>
        <Paper sx={{ padding: '16px' }}>
          <h4>{messages.length} комментария(ев)</h4>
          <CommentDraft topicId={topic.id!} label="Write here your comment" />
          <div className={styles.commentsRoo}>
            {messages.map(comment => (
              <ForumComment key={comment.id} comment={comment} />
            ))}
          </div>
        </Paper>
      </Box>
    </GeneralLayout>
  )
}
