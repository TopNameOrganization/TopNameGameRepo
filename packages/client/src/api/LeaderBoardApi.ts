import { AxiosResponse } from 'axios';
import { api } from './api';
import { LeaderData } from './types';

const URL = '/leaderboard';
const MAX = 10;

export class LeaderBoardAPI {
  static TEAM = 'fantasy_run_test';

  static addLeader = (data: LeaderData) =>
    api.post<string, AxiosResponse<string>>(URL, {
      temaName: LeaderBoardAPI.TEAM,
      ratingFieldName: 'score',
      data
    });

  static getLeaders = (ratingFieldName: string) =>
    api.post<string, AxiosResponse<{ data: LeaderData }[]>>(`${URL}/${LeaderBoardAPI.TEAM}`, {
      ratingFieldName,
      cursor: 0,
      limit: MAX
    });
}
