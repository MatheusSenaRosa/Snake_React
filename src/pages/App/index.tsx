import { useCallback, useEffect, useState } from "react";
import { Snake, Board, Direction } from "./interfaces";
import { formatKeyValue, getBoardValues, getSnake } from "./utils";

import * as S from "./styles";

const boardSize = 30;

export function AppPage() {
  const [board, setBoard] = useState<Board>([]);
  const [snake, setSnake] = useState<Snake[]>([]);
  const [direction, setDirection] = useState<Direction>();

  const foodValue = 1;

  const clearAllIntervals = () => {
    for (let i = 1; i < 5000; i++) {
      console.log(i);
      window.clearInterval(i);
    }
  };

  const handleDirectionInterval = useCallback((newDirection: Direction) => {
    clearAllIntervals();

    window.setInterval(() => {
      if (newDirection === "Up") {
        setSnake((prev) =>
          prev.map((item) => ({ boardValue: item.boardValue - boardSize }))
        );
      }

      if (newDirection === "Down") {
        setSnake((prev) =>
          prev.map((item) => ({ boardValue: item.boardValue + boardSize }))
        );
      }

      if (newDirection === "Left") {
        setSnake((prev) =>
          prev.map((item) => ({ boardValue: item.boardValue - 1 }))
        );
      }

      if (newDirection === "Right") {
        setSnake((prev) =>
          prev.map((item) => ({ boardValue: item.boardValue + 1 }))
        );
      }
    }, 75);
  }, []);

  const changeSnakeDirection = useCallback(
    (e: KeyboardEvent) => {
      const newDirection = formatKeyValue(e.key);

      const isSameDirection = newDirection === direction;
      const isOpposite =
        (direction === "Down" && newDirection === "Up") ||
        (direction === "Up" && newDirection === "Down") ||
        (direction === "Left" && newDirection === "Right") ||
        (direction === "Right" && newDirection === "Left");

      if (!newDirection || isSameDirection || isOpposite) return;

      handleDirectionInterval(newDirection);
      setDirection(newDirection);
    },
    [direction, handleDirectionInterval]
  );

  useEffect(() => {
    setBoard(getBoardValues(boardSize));
    setSnake(getSnake());
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", changeSnakeDirection);

    return () => {
      document.removeEventListener("keydown", changeSnakeDirection);
    };
  }, [changeSnakeDirection]);

  return (
    <S.Container>
      <S.GameWrapper>
        <S.Header>
          <h3>Score: 0</h3>
          <h3>High Score: 11</h3>
        </S.Header>

        <S.Board>
          {board.map((column) =>
            column.map((boardValue) => (
              <S.Block
                isSnake={snake.some((item) => item.boardValue === boardValue)}
                isFood={foodValue === boardValue}
              />
            ))
          )}
        </S.Board>
      </S.GameWrapper>
    </S.Container>
  );
}
