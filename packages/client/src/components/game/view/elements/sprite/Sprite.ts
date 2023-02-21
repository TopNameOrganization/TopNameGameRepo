import { TileSize, AnimationPhases } from "../../../constants";
import { PhasesType, SpriteConfigType } from './types'

export class Sprite {
  private time = 0;
  private frame = 0;
  
  private img: HTMLImageElement;
  private fps: number;
  private phases: PhasesType;

  constructor({ img, fps, phases, }: SpriteConfigType) {
    this.img = img;
    this.fps = fps;
    this.phases = phases;
  }

  public getPhase(dt: number, phase: AnimationPhases = 0, direction: number): { x: number, y: number, img: HTMLImageElement } {
    this.time += dt;
    const frameOffset = this.phases[phase].start;
    if (this.time >= 1 / this.fps) {
      this.frame = (this.frame + 1) % this.phases[phase].length;
      this.time = 0;
    }
    let x = (this.frame + frameOffset) * TileSize;
    let y = direction * TileSize;
    x = x >= this.img.width ? this.img.width - TileSize : x;
    y = y >= this.img.height ? this.img.height - TileSize : y;

    return { x, y, img: this.img };
  }
}
