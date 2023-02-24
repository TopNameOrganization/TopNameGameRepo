import { TileSize } from "../../constants";
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

  public getPhase(dt: number, phase = 0, direction = 0): { x: number, y: number, img: HTMLImageElement } {
    this.time += dt;
    let x = 0;
    let y = 0;
    if (this.phases[phase]) {
      const frameOffset = this.phases[phase].start;
      if (this.time >= 1 / this.fps) {
        this.frame = (this.frame + 1) % this.phases[phase].length;
        this.time = 0;
      }
      x = (this.frame + frameOffset) * TileSize;
      y = direction * TileSize;
      x = x >= this.img.width ? this.img.width - TileSize : x;
      y = y >= this.img.height ? this.img.height - TileSize : y;
    }
    return { x, y, img: this.img };
  }
}
