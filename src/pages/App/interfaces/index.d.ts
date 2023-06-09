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

export type DirectionByTailDifference = { [key: number]: Direction };
