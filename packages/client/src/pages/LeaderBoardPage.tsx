import React from 'react'
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'

const LeaderBoardPage = () => {
  // это должно быть из стора, а там из апи, но это неточно ))
  const data = [
    { name: 'aaa', level: 10, score: 1000 },
    { name: 'bbb', level: 8, score: 500 },
    { name: 'ccc', level: 2, score: 20 },
  ]

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '50px' }} align="center">
              No.
            </TableCell>
            <TableCell sx={{ width: '200px' }} align="center">
              Имя
            </TableCell>
            <TableCell sx={{ width: '200px' }} align="center">
              Уровень
            </TableCell>
            <TableCell align="center">Счёт</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ name, level, score }, index) => (
            <TableRow key={index}>
              <TableCell size="small" align="right">
                {index}
              </TableCell>
              <TableCell align="center">{name}</TableCell>
              <TableCell align="center">{level}</TableCell>
              <TableCell align="center">{score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default LeaderBoardPage
