import {
  Board,
  CurrentPreviousSnake,
  Direction,
  DirectionByTailDifference,
  Snake,
} from "../interfaces";

export const directionByTailDifference: DirectionByTailDifference = {
  [30]: "Up",
  [-30]: "Down",
  [1]: "Left",
  [-1]: "Right",
};

export const initBoard = (boardSize: number): Board => {
  const columnsArray: number[][] = new Array(boardSize).fill(
    new Array(boardSize).fill(0)
  );

  const blocks = columnsArray.map((column, columnIndex) => {
    return column.map((_, rowIndex) => {
      const rowValue = columnIndex * boardSize + (rowIndex + 1);
      return rowValue;
    });
  });

  const boardVolume = boardSize * boardSize;

  const leftWalls = [0];
  const rightWalls: number[] = [];

  for (let i = 1; i <= boardVolume; i++) {
    if (!(i % boardSize)) {
      rightWalls.push(i);

      if (i !== boardVolume) {
        leftWalls.push(i + 1);
      }
    }
  }

  return {
    blocks,
    leftWalls,
    rightWalls,
  };
};

export const initSnake = (boardSize: number): Snake => {
  const boardVolume = boardSize * boardSize;
  const boardValue = Math.ceil(Math.random() * boardVolume);

  return {
    previous: [],
    current: [{ boardValue }],
  };
};

export const getNewFoodBoardValue = (
  boardSize: number,
  currentSnake: CurrentPreviousSnake[]
) => {
  const boardVolume = boardSize * boardSize;
  const board = Array(boardVolume)
    .fill(null)
    .map((_, index) => index + 1);

  const invalidValues = currentSnake.map((item) => item.boardValue);

  const validBoardValues = board.filter(
    (item) => !invalidValues.includes(item)
  );

  const randomIndex = Math.ceil(Math.random() * (validBoardValues.length - 1));

  return validBoardValues[randomIndex];
};

export const formatKeyValue = (keyValue: string) => {
  const directionValue = keyValue.split("Arrow")[1];

  if (directionValue) {
    return directionValue as Direction;
  }

  return null;
};

export const validateDirection = (
  previousDirection: Direction,
  newDirection: Direction
) => {
  const isSameDirection = newDirection === previousDirection;
  const isOpposite =
    (previousDirection === "Down" && newDirection === "Up") ||
    (previousDirection === "Up" && newDirection === "Down") ||
    (previousDirection === "Left" && newDirection === "Right") ||
    (previousDirection === "Right" && newDirection === "Left");

  if (!newDirection || isSameDirection || isOpposite) return false;

  return true;
};
