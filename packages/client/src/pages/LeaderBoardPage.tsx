import React, { useEffect } from 'react'
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'
import { GeneralLayout } from '../layouts'
import { useAppActions, useAppSelector } from '../hooks/redux'

export const LeaderBoardPage = () => {
  const { getLeaders } = useAppActions()
  const { leaders: data } = useAppSelector(state => state.leaderboardReducer)

  useEffect(() => {
    getLeaders('score')
  }, [])

  return (
    <GeneralLayout>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '50px' }} align="center">
                No.
              </TableCell>
              <TableCell sx={{ width: '200px' }} align="center">
                Name
              </TableCell>
              <TableCell
                sx={{ width: '200px' }}
                align="center"
                onClick={() => {
                  getLeaders('level')
                }}>
                Level
              </TableCell>
              <TableCell
                align="center"
                onClick={() => {
                  getLeaders('score')
                }}>
                Score
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(({ name, level, score }, index) => (
              <TableRow key={`key${index}`}>
                <TableCell size="small" align="center">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{name}</TableCell>
                <TableCell align="center">{level}</TableCell>
                <TableCell align="center">{score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </GeneralLayout>
  )
}
