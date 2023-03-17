import GameModel from '../model/GameModel';
import { checkNode } from './checkNode';
import { RunnerAction } from '../constants';

describe('check node over stair', () => {
  jest.spyOn(GameModel, 'getLevelMap').mockImplementation(() => [
    [0, 0, 0],
    [1, 0, 0],
    [1, 3, 0]
  ]);
  it('check', () => {
    expect(checkNode({ x: 1, y: 1 })).toEqual([RunnerAction.MoveDown]);
  });
});
