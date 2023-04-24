import { Direction, Snake } from "../interfaces";

export const getBoardValues = (boardSize: number): number[][] => {
  const columnsArray: number[][] = new Array(boardSize).fill(
    new Array(boardSize).fill(0)
  );

  const boardArray = columnsArray.map((column, columnIndex) => {
    return column.map((_, rowIndex) => {
      const rowValue = columnIndex * boardSize + (rowIndex + 1);
      return rowValue;
    });
  });

  return boardArray;
};

export const getSnake = (): Snake[] => {
  const boardValue = Math.ceil(Math.random() * 900);

  return [
    {
      boardValue,
    },
  ];
};

export const formatKeyValue = (keyValue: string) => {
  const directionValue = keyValue.split("Arrow")[1];

  if (directionValue) {
    return directionValue as Direction;
  }

  return null;
};
