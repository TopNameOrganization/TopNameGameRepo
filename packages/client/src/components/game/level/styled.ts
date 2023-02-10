import styled from '@emotion/styled'
import { TileSize } from '../constants'

export const Tile = styled.div<{ type: number }> `
  width: ${TileSize}px;
  height: ${TileSize}px;
  background: ${({ type }) => {
    switch (type) {
      case 1:
        return 'red';
      case 2:
        return 'white';
      default:
        return 'black';
    }
  }};
`;
