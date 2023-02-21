import { AnimationPhases } from '../../../constants'

export type PhasesType = Record<AnimationPhases, Record<string, number>>
export type SpriteConfigType = {
  img: HTMLImageElement,
  fps: number,
  phases: PhasesType,
}
