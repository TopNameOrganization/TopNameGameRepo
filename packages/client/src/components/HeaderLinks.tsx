import * as React from 'react'
import { Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useRouteMatch } from '../hooks/useRouteMatch'
import { ROUTES } from '../constants'

export const HeaderLinks = () => {
  const routeMatch = useRouteMatch(Object.values(ROUTES))
  const currentTab = routeMatch?.pattern?.path

  return (
    <Tabs
      TabIndicatorProps={{ style: { background: '#fff' } }}
      value={currentTab}
      textColor="inherit"
      centered>
      <Tab label="Game" value={ROUTES.game} to={ROUTES.game} component={Link} />
      <Tab
        label="Leader board"
        value={ROUTES.leaderBoard}
        to={ROUTES.leaderBoard}
        component={Link}
      />
    </Tabs>
  )
}
