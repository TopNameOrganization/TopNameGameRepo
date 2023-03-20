import { Runner as RunnerType } from './Runner';
import { CheckCollisionType, PositionType, PathGraphType } from './types';
import { RunnerAction, TileSize, FLOOR } from '../constants';
import { worldToMap, getTileAt, mapToWorld } from '../utils';
import { buildGraph, buildEdge, verticeId } from './buildGraph';
import { getStartNode } from './checkNode';
import { find } from './find';

export class Agent {
  private graph: PathGraphType;

  constructor() {
    //
  }

  public updateGraph(init: Array<PositionType>): void {
    this.graph = buildGraph(init);
  }

  public getGraph() {
    return this.graph;
  }

  public update(dTime: number, actor: RunnerType): CheckCollisionType {
    if (!actor.target) {
      actor.setTarget(worldToMap({ x: actor.x, y: actor.y }));
    }
    let newPos = actor.getNextPos(dTime);
    const newPosAtMap = worldToMap({ x: newPos.x + TileSize / 2, y: newPos.y + TileSize / 2 });
    const newForwardAtMap = worldToMap(actor.getCheckCollisionPoint(newPos));

    const { x, y } = actor.target;
    if (newPosAtMap.x === x && newPosAtMap.y === y &&
      (newForwardAtMap.x !== x || newForwardAtMap.y !== y)) {
      newPos = { ...mapToWorld(actor.target) };
      if (actor.action === RunnerAction.Fall) {
        actor.resetAction();
      }
      if (actor.path.length > 0) {
        actor.targetFromPath();
      } else {
        actor.setAction(RunnerAction.Stay);
      }
    }

    const tile = getTileAt(newPosAtMap);
    const onFloor = FLOOR.includes(getTileAt({ x: newPosAtMap.x, y: newPosAtMap.y + 1 }));

    return {
      position: newPos,
      phase: actor.getAnimationPhase(tile, onFloor)
    };
  }

  public getNearestVertice({ x, y }: PositionType): string {
    const atMap = worldToMap({ x, y });
    const { actions } = getStartNode({ x, y });
    let minCost = 1000;
    let verticeId = '';
    actions.forEach((action) => {
      const { cost, vertice } = buildEdge({ x: atMap.x, y: atMap.y, action });
      if (cost < minCost) {
        minCost = cost;
        verticeId = vertice;
      }
    });
    return verticeId;
  }

  public findPath(actor: RunnerType, goal: string) {
    const { x, y } = actor;
    const path = find(verticeId(worldToMap({ x, y })), goal, this.graph);
    actor.setPath(path);
  }
}
