import { AnimationPhase } from '../../constants'
import enemyImg from '../../../../assets/game/enemy.png';

const img = new Image();
img.src = enemyImg;

export const enemyCfg = {
  img,
  fps: 30,
  phases: {
    [AnimationPhase.Run]: { start: 0, length: 8 },
    [AnimationPhase.Climb]: { start: 8, length: 8 },
    [AnimationPhase.Hang]: { start: 16, length: 8 },
    [AnimationPhase.Fall]: { start: 24, length: 8 },
    [AnimationPhase.Stay]: { start: 28, length: 1 },
  },
}
