import GameModel from './GameModel'
import { buildGraph } from './buildGraph';
import { RunnerAction } from '../constants';

const graph = {
  '0-0': {
    x: 0, y: 0,
    edges: [
      { action: RunnerAction.MoveRight, cost: 1, vertice: '1-0' }
    ]
  },
  '1-0': {
    x: 1, y: 0,
    edges: [
      { action: RunnerAction.Fall, cost: 2, vertice: '1-2' }
    ]
  },
  '1-2': {
    x: 1, y: 2,
    edges: [
      { action: RunnerAction.MoveLeft, cost: 1, vertice: '0-2' },
      { action: RunnerAction.MoveRight, cost: 2, vertice: '3-2' },
    ]
  },
  '0-2': {
    x: 0, y: 2,
    edges: [
      { action: RunnerAction.MoveRight, cost: 3, vertice: '3-2' },
    ]
  },
  '3-2': {
    x: 3, y: 2,
    edges: [
      { action: RunnerAction.MoveLeft, cost: 3, vertice: '0-2' },
    ]
  }
}

describe('build path graph', () => {
  jest.spyOn(GameModel, 'getLevelMap').mockImplementation(() => [
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 0]
  ]);
  
  it('build', () => {
    expect(buildGraph()).toEqual(graph);
  })
})
