import { TileSize } from "../../../constants";
import { AnimationPhases } from "../../../model";

export class Sprite {
  private time = 0;
  private frame = 0;
  private curentPhaseFrames = 4;
  private fps = 15;

  private phases: Record<AnimationPhases, number> = {
    [AnimationPhases.Run]: 0,
    [AnimationPhases.Climb]: 4,
    [AnimationPhases.Hang]: 8,
    [AnimationPhases.Fall]: 12,
    [AnimationPhases.Stay]: 16,
  }

  constructor(cfg: unknown) {
    // TODO: тут должны быть настройки спрайта, но пока так, что б ошибка не выпадала
    console.log(cfg);
  }

  public getPhase(dt: number, phase: AnimationPhases = 0, direction: number): { x: number, y: number, w: number, h: number } {
    this.time += dt;
    const frameOffset = this.phases[phase];
    if (this.time >= 1 / this.fps) {
      if (phase === AnimationPhases.Stay) {
        this.frame = 0;
      } else {
        this.frame = (this.frame + 1) % this.curentPhaseFrames;
      }
      this.time = 0;
    }
    return { x: (this.frame + frameOffset) * TileSize, y: direction * TileSize, w: TileSize, h: TileSize };
  }
}
