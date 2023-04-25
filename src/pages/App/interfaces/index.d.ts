type CurrentPreviousSnake = { boardValue?: number; isNew?: boolean };

export type Snake = {
  previous: CurrentPreviousSnake[];
  current: CurrentPreviousSnake[];
};

export type Board = {
  blocks: number[][];
  leftWalls: number[];
  rightWalls: number[];
};

export type Direction = "Up" | "Down" | "Left" | "Right" | null;

export type DirectionByTailDifference = { [key: number]: Direction };
