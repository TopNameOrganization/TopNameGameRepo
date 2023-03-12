import { AnimationPhase } from '../../constants'
import { getImage } from './get-image';
import runnerImg from '../../../../assets/game/player.png';

export const playerCfg = {
  img: getImage(runnerImg)!,
  fps: 15,
  phases: {
    [AnimationPhase.Run]: { start: 0, length: 4 },
    [AnimationPhase.Climb]: { start: 4, length: 4 },
    [AnimationPhase.Hang]: { start: 8, length: 4 },
    [AnimationPhase.Fall]: { start: 12, length: 4 },
    [AnimationPhase.Stay]: { start: 16, length: 1 },
  },
}
