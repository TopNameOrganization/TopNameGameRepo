export type PhasesType = Record<number, Record<string, number> | null>
export type SpriteConfigType = {
  img: HTMLImageElement,
  fps: number,
  phases: PhasesType,
}
