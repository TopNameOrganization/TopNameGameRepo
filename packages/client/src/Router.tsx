import { Routes, Route } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'
import { PublicRoutes } from './PublicRoutes'
import { ROUTES } from './constants'
import * as Pages from './pages'

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.root} element={<Pages.RootPage />} />
      <Route element={<PublicRoutes />}>
        <Route path={ROUTES.login} element={<Pages.SignInPage />} />
        <Route path={ROUTES.signup} element={<Pages.SignUpPage />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path={ROUTES.game} element={<Pages.GamePage />} />
        <Route path={ROUTES.profile} element={<Pages.ProfilePage />} />
        <Route path={ROUTES.leaderBoard} element={<Pages.LeaderBoardPage />} />
        <Route path={ROUTES.forum} element={<Pages.ForumLayoutPage />} >
          <Route index element={<Pages.ForumListPage />} />
          <Route path={ROUTES.forumCreate} element={<Pages.ForumCreatePage />} />
          <Route path={ROUTES.forumDetail} element={<Pages.ForumDetailPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Pages.NotFoundPage />} />
    </Routes>
  )
}
