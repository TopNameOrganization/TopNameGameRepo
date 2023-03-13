import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'
import { PublicRoutes } from './PublicRoutes'
import { ROUTES } from './constants'
import * as Pages from './pages'

export const Router = () => {
  const { root, login, signup, game, profile, leaderBoard } = ROUTES
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path={login.path} element={<Pages.SignInPage />} />
        <Route path={signup.path} element={<Pages.SignUpPage />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        {/* <Route path={game.path} element={<Pages.GamePage />} /> */}
        <Route path={profile.path} element={<Pages.ProfilePage />} />
        <Route path={leaderBoard.path} element={<Pages.LeaderBoardPage />} />
      </Route>
      <Route path={root.path} element={<Pages.RootPage />} />
      <Route path="*" element={<Pages.NotFoundPage />} />
    </Routes>
  )
}
