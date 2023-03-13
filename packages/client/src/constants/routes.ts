import { loadMe } from '../store/actions/userAction'
import { AppDispatch } from '../store/reducers'

interface RouteParams {
  path: string
  loader?: (dispatch: AppDispatch) => any
}

export const ROUTES: Record<string, RouteParams> = {
  root: { path: '/' },
  home: { path: '/home' },
  game: { path: '/game' },
  login: { path: '/login' },
  signup: { path: '/signup' },
  profile: {
    path: '/profile',
    loader: (dispatch: AppDispatch) => {
      return dispatch(loadMe())
    },
  },
  leaderBoard: { path: '/leader-board' },
}
