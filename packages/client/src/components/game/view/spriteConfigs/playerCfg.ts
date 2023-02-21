import { AnimationPhases } from '../../constants'
import runnerImg from '../../../../assets/game/player.png';

const img = new Image();
img.src = runnerImg;

export const playerCfg = {
  img,
  fps: 15,
  phases: {
    [AnimationPhases.Run]: { start: 0, length: 4 },
    [AnimationPhases.Climb]: { start: 4, length: 4 },
    [AnimationPhases.Hang]: { start: 8, length: 4 },
    [AnimationPhases.Fall]: { start: 12, length: 4 },
    [AnimationPhases.Stay]: { start: 16, length: 1 },
  },
}
