import { isServer } from "../../../../constants/is-browser";

export const getImage = (src: string): HTMLImageElement | null => {
  if (isServer) {
    return null;
  }

  const img = new Image();
  img.src = src;
  return img;
}