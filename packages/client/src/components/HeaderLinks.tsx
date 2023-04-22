import * as React from 'react'
import { Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useRouteMatch } from '../hooks/useRouteMatch'
import { ROUTES } from '../constants'

export const HeaderLinks = () => {
  const routeMatch = useRouteMatch(Object.values(ROUTES))
  const currentTab = routeMatch?.pattern?.path
  const possibleTabs = [
    ROUTES.game,
    ROUTES.leaderBoard,
  ];

  const value = possibleTabs.includes(currentTab!) ? currentTab : false;

  return (
    <Tabs
      TabIndicatorProps={{ style: { background: '#fff' } }}
      value={value}
      textColor="inherit"
      centered
    >
      <Tab label="Game" value={ROUTES.game} to={ROUTES.game} component={Link} />
      <Tab
        label="Leader board"
        value={ROUTES.leaderBoard}
        to={ROUTES.leaderBoard}
        component={Link}
      />
      <Tab
        label="Forum"
        value={ROUTES.forum}
        to={ROUTES.forum}
        component={Link}
      />
    </Tabs>
  )
}
