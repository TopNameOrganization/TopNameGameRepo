import { Runner as RunnerType } from './Runner';
import { CheckCollisionType, PositionType } from './types';
import { checkCollision } from './checkCollision';
import { RunnerAction, Tile, OBSTACLE, TileSize } from '../constants';
import { getTileAt, worldToMap } from '../utils';

const checkNode = ({ x, y }: PositionType, action: RunnerAction): Array<RunnerAction> => {
  const res = [];
  const center = getTileAt({ x, y });
  const bottom = getTileAt({ x, y: y + 1 });
  const top = getTileAt({ x, y: y - 1 });
  const left = getTileAt({ x: x - 1, y });
  const right = getTileAt({ x: x + 1, y });

  if ([center, bottom].includes(Tile.Stair)) {
    switch (action) {
      case RunnerAction.MoveLeft:
      case RunnerAction.MoveRight:
        if (!OBSTACLE.includes(top)) {
          if (center === Tile.Stair) {
            res.push(RunnerAction.MoveUp);
          }
        }
        if (!OBSTACLE.includes(bottom)) {
          res.push(RunnerAction.MoveDown);
        }
        break;
      case RunnerAction.MoveUp:
      case RunnerAction.MoveDown:
        if ([Tile.Brick, Tile.Concrete].includes(bottom)) {
          if (!OBSTACLE.includes(right)) {
            res.push(RunnerAction.MoveRight);
          }
          if (!OBSTACLE.includes(left)) {
            res.push(RunnerAction.MoveLeft);
          }
        }
        break;
      default:
    }
  }

  return res;
}

export const agent = (dTime: number, actor: RunnerType): CheckCollisionType => {
  let turn = false;
  const { action, orientation } = actor;
  const { position, phase, isEnd } = checkCollision(dTime, actor);

  const currAtMap = worldToMap({
    x: actor.x + TileSize / 2,
    y: actor.y + TileSize / 2
  });
  const nextAtMap = worldToMap({
    x: position.x + TileSize / 2,
    y: position.y + TileSize / 2
  });

  if (currAtMap.x !== nextAtMap.x || currAtMap.y !== nextAtMap.y) {
    const dirs = checkNode(currAtMap, action);
    if (dirs.length > 0) {
      actor.setAction(dirs[Math.floor(Math.random() * dirs.length)]);
      turn = true;
    }
  } else if (isEnd) {
    switch (action) {
      case RunnerAction.MoveDown:
        actor.setAction(RunnerAction.MoveUp);
        break;
      case RunnerAction.MoveUp:
        actor.setAction(RunnerAction.MoveDown);
        break;
      case RunnerAction.MoveLeft:
        actor.setAction(RunnerAction.MoveRight);
        break;
      case RunnerAction.MoveRight:
        actor.setAction(RunnerAction.MoveLeft);
        break;
      default:
    }
  }

  if (action === RunnerAction.Stay) {
    actor.setAction(orientation === 1 ? RunnerAction.MoveRight : RunnerAction.MoveLeft);
  }

  return { position: turn ? { x: actor.x, y: actor.y } : position, phase, isEnd };
}
