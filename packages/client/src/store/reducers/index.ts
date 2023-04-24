import { combineReducers } from 'redux'
import { userReducer } from './userSlice'
import { changeUserProfileReducer } from './changeUserProfileSlice'
import { leaderboardReducer } from './leaderboardSlice'
import { setupStore } from '../index'
import { forumTopicReducer } from './forumTopicSlice'
import { forumTopicByIdReducer } from './forumTopicByIdSlice'
import { forumMessagesReducer } from './forumMessagesSlice'

export const rootReducer = combineReducers({
  userReducer,
  changeUserProfileReducer,
  leaderboardReducer,
  forumTopicReducer,
  forumTopicByIdReducer,
  forumMessagesReducer,
})
export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']
