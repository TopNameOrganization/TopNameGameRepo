import { Directions, Tiles, TileSize } from "../constants";
import Runner from './Runner';
import { Runner as RunnerType } from "./Runner";
import { EventBus } from "../utils/EventBus";
import { LevelType, SizeType, PositionType, ModelEvents } from "./types";

export class GameModel extends EventBus {
  private player: RunnerType;
  private level: LevelType;

  constructor() {
    super();
  }

  // TODO: подумать более лучше про тип и вообще, как и где это хранить
  public setLevel({ level, player }: { level: LevelType, player: PositionType }): void {
    this.level = level;
    this.player = new Runner(player);
  }

  // чтоб GameView могло узнать, какого размера canvas делать
  public getLevelSize(): SizeType {
    return { width: this.level[0].length * TileSize, height: this.level.length * TileSize };
  }

  // чтоб GameView могло узнать, какой уровень рисовать
  public getLevel(): LevelType {
    return this.level;
  }

  // чтоб можно было снаружи снаружи задиспатчить обновление
  // TODO: скорее всего выпилить после того, как научить модель считать время
  public dispatchUpdate(): void {
    // TODO: диспатчить ВСЕ изменения, а не только игрока
    const { x, y } = this.player;
    this.dispatch(ModelEvents.Update, { x, y });
  }

  // для управления игроком снаружи
  // TODO: перепилить, наверно, на состояние
  public movePlayer(dir: Directions): void {
    const tile = this.getTileAtPlayer(0, 0);
    const tileUnder = this.getTileAtPlayer(0, 1);

    const { x, y } = this.player;
    const dy = dir === Directions.Down ? 1 : -1;
    const dx = dir === Directions.Right ? 1 : -1;

    // обработчик столкновений
    // TODO: вынести всё это в отдельный фаел, а то и вовсе класс
    switch (dir) {
      case Directions.Up:
      case Directions.Down:
        if (y + dy < 0 || y + dy >= this.level.length) {
          // выходим за пределы уровня, а туда выходить нельзя
          break;
        }
        if (this.checkPlayerFall()) {
          // есть куда упасть, значит надо падать 
          this.player.setPosition({ x, y: y + 1 });
          break;
        }
        if (dir === Directions.Down && tile === Tiles.Rope
          && (tileUnder === Tiles.Empty || tileUnder === Tiles.Rope)) {
          // если висим на верёвке и жмём вниз, значит надо падать
          this.player.setPosition({ x, y: y + 1 });
          break;
        }
        if (tile === Tiles.Stair || tileUnder === Tiles.Stair) {
          // вот мы на лестнице, смотрим какие есть варианты
          if ((this.getTileAtPlayer(0, dy) === Tiles.Brick || this.getTileAtPlayer(0, dy) === Tiles.Concrete)
            || (dir === Directions.Up && tile !== Tiles.Stair)) {
            // если наткнулись стену или идём вверх, но лестница уже закончилась, дальше идти нельзя
            break;
          }
          this.player.setPosition({ x, y: y + dy });
        }
        break;
      case Directions.Right:
      case Directions.Left:
        if (x + dx < 0 || x + dx >= this.level[0].length) {
          // выходим за пределы уровня, а туда выходить нельзя
          break;
        }
        if (this.getTileAtPlayer(dx, 0) === Tiles.Brick || this.getTileAtPlayer(dx, 0) === Tiles.Concrete) {
          // наткнулись на стену, дальше идти нельзя
          break;
        }
        this.player.setPosition({ x: x + dx, y });
        break;
    }

    // проверяем
    if (this.checkPlayerFall()) {
      this.movePlayer(Directions.Down);
    }

    this.dispatchUpdate();
  }

  private checkPlayerFall(): boolean {
    return (this.getTileAtPlayer(0, 1) === Tiles.Empty || this.getTileAtPlayer(0, 1) === Tiles.Rope)
      && this.getTileAtPlayer(0, 0) === Tiles.Empty;
  }

  private getTileAtPlayer(x: number, y: number): Tiles {
    return this.level[this.player.y + y][this.player.x + x]
  }
}

export default new GameModel();
