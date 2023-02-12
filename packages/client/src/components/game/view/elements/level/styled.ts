import styled from '@emotion/styled'
import { TileSize, Tiles } from '../../../constants'

export const FlexContainer = styled.div`
  display: flex;
`;

export const Tile = styled.div<{ type: number }> `
  width: ${TileSize}px;
  height: ${TileSize}px;
  background: ${({ type }) => {
    switch (type) {
      case Tiles.Brick:
        return 'red';
      case Tiles.Concrete:
        return 'darkred';
      case Tiles.Stair:
        return 'white';
      case Tiles.Rope:
        return 'lightgrey';
      default:
        return 'black';
    }
  }};
`;
