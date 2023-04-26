import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Snake, Direction } from "./interfaces";
import {
  formatKeyValue,
  getNewFoodBoardValue,
  initBoard,
  initSnake,
  validateDirection,
} from "./utils";

import * as S from "./styles";

const boardSize = 30;
const boardVolume = boardSize * boardSize;

export function AppPage() {
  const [direction, setDirection] = useState<Direction>(null);
  const [foodValue, setFoodValue] = useState(0);
  const [score, setScore] = useState({
    current: 0,
    highest: 0,
  });
  const [snake, setSnake] = useState<Snake>({
    current: [],
    previous: [],
  });

  const intervalsRef = useRef<NodeJS.Timer[]>([]);

  const board = useMemo(() => initBoard(boardSize), []);

  const renderGame = (boardValue: number) => {
    const isHead = boardValue === snake.current[0].boardValue;

    if (isHead) {
      return <S.SnakeHead direction={direction} key={boardValue} />;
    }

    const isTail =
      snake.current[snake.current.length - 1].boardValue === boardValue;

    if (isTail) {
      const tailDifference =
        Number(snake.current[snake.current.length - 1].boardValue) -
        Number(snake.current[snake.current.length - 2].boardValue);

      const directionByTailDifference: { [key: number]: Direction } = {
        [30]: "Up",
        [-30]: "Down",
        [1]: "Left",
        [-1]: "Right",
      };

      const tailDirection = directionByTailDifference[tailDifference];

      return <S.SnakeTail key={boardValue} direction={tailDirection} />;
    }

    const isBody = snake.current.some((item) => item.boardValue === boardValue);

    if (isBody) {
      return <S.SnakeBody key={boardValue} />;
    }

    const isFood = foodValue === boardValue;

    if (isFood) {
      return <S.Food key={boardValue} />;
    }

    return <S.BoardBlock key={boardValue} />;
  };

  const initGame = useCallback(() => {
    const highestScore = localStorage.getItem("@SnakeGame:Highest_Score");
    setScore({ current: 0, highest: Number(highestScore) || 0 });

    const initialSnake = initSnake(boardSize);

    setDirection(null);

    setSnake(initialSnake);
    setFoodValue(getNewFoodBoardValue(boardSize, initialSnake.current));
  }, []);

  const handleGameOver = useCallback(() => {
    if (score.highest < score.current) {
      localStorage.setItem("@SnakeGame:Highest_Score", String(score.current));
    }
    stopCurrentInterval();
    initGame();

    alert("aaaaaa");
  }, [initGame, score]);

  const stopCurrentInterval = () => {
    const { length } = intervalsRef.current;

    if (!length) return;

    const currentInterval = intervalsRef.current[length - 1];
    clearInterval(currentInterval);

    intervalsRef.current = [];
  };

  const handleDirectionMovement = (newDirection: Direction) => {
    if (newDirection === "Up") {
      setSnake((prev) => {
        const previous = [...prev.current];

        const current = previous.map((item, index) => {
          if (item?.boardValue) {
            if (index === 0) return { boardValue: item.boardValue - boardSize };

            const { boardValue } = previous[index - 1];
            return { boardValue };
          }

          const { boardValue } = previous[previous.length - 2];
          return { boardValue };
        });

        return {
          current,
          previous,
        };
      });
    }

    if (newDirection === "Down") {
      setSnake((prev) => {
        const previous = prev.current.filter((item) => item?.boardValue);

        const current = prev.current.map((item, index) => {
          if (item?.boardValue) {
            if (index === 0) {
              return { boardValue: item.boardValue + boardSize };
            }

            return { boardValue: prev.current[index - 1].boardValue };
          }

          const { boardValue } = prev.current[prev.current.length - 2];
          return { boardValue };
        });

        return { current, previous };
      });
    }

    if (newDirection === "Left") {
      setSnake((prev) => {
        const previous = [...prev.current];

        const current = previous.map((item, index) => {
          if (item?.boardValue) {
            if (index === 0) return { boardValue: item.boardValue - 1 };

            return { boardValue: previous[index - 1].boardValue };
          }

          const { boardValue } = previous[previous.length - 2];
          return { boardValue };
        });

        return { current, previous };
      });
    }

    if (newDirection === "Right") {
      setSnake((prev) => {
        const previous = [...prev.current];

        const current = previous.map((item, index) => {
          if (item?.boardValue) {
            if (index === 0) return { boardValue: item.boardValue + 1 };

            return { boardValue: previous[index - 1].boardValue };
          }

          const { boardValue } = previous[previous.length - 2];
          return { boardValue };
        });
        return { current, previous };
      });
    }
  };

  const handleMovementInterval = useCallback((newDirection: Direction) => {
    stopCurrentInterval();

    handleDirectionMovement(newDirection);

    const intervalId = setInterval(() => {
      handleDirectionMovement(newDirection);
    }, 75);

    intervalsRef.current.push(intervalId);
  }, []);

  const handleEating = useCallback(() => {
    setFoodValue(getNewFoodBoardValue(boardSize, snake.current));
    setScore((prev) => ({ ...prev, current: prev.current + 1 }));

    setSnake((prev) => ({
      previous: [...prev.current],
      current: [...prev.current, { isNew: true }],
    }));
  }, [snake]);

  const changeSnakeDirection = useCallback(
    (e: KeyboardEvent) => {
      const newDirection = formatKeyValue(e.key);

      const isDirectionValid = validateDirection(direction, newDirection);

      if (!isDirectionValid) return;

      handleMovementInterval(newDirection);
      setDirection(newDirection);
    },
    [handleMovementInterval, direction]
  );

  const validateIfSnakeHasCollided = useCallback(() => {
    const previousSnakeHead = snake.previous[0].boardValue as number;
    const currentSnakeHead = snake.current[0].boardValue as number;

    const hasCollidedRight =
      board.leftWalls.includes(currentSnakeHead) &&
      board.rightWalls.includes(previousSnakeHead);

    const hasCollidedLeft =
      board.rightWalls.includes(currentSnakeHead) &&
      board.leftWalls.includes(previousSnakeHead);

    const hasCollidedHorizontal =
      currentSnakeHead < 1 || currentSnakeHead > boardVolume;
    const hasCollidedVertical = hasCollidedRight || hasCollidedLeft;

    const hasCollidedItself = snake.current.some((item, index) => {
      if (index === 0) return false;

      return item.boardValue === currentSnakeHead;
    });

    return hasCollidedHorizontal || hasCollidedVertical || hasCollidedItself;
  }, [board, snake]);

  useEffect(() => {
    if (snake.current.length && snake.previous.length) {
      const currentSnakeHeadValue = snake.current[0].boardValue;
      const previousSnakeHeadValue = snake.previous[0].boardValue;

      // Avoids looping
      if (
        currentSnakeHeadValue === foodValue &&
        previousSnakeHeadValue !== currentSnakeHeadValue
      ) {
        handleEating();
      }
    }
  }, [snake, handleEating, foodValue]);

  useEffect(() => {
    document.addEventListener("keydown", changeSnakeDirection);

    return () => {
      document.removeEventListener("keydown", changeSnakeDirection);
    };
  }, [changeSnakeDirection]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useLayoutEffect(() => {
    if (snake.current.length && snake.previous.length) {
      const hasCollided = validateIfSnakeHasCollided();

      if (hasCollided) {
        handleGameOver();
      }
    }
  }, [handleGameOver, snake, validateIfSnakeHasCollided]);

  return (
    <S.Container>
      <S.GameWrapper>
        <S.Header>
          <h3>Score: {score.current}</h3>
          <h3>High Score: {score.highest}</h3>
        </S.Header>

        {Boolean(snake.current.length) && (
          <S.Board>
            {board.blocks.map((column) =>
              column.map((boardValue) => renderGame(boardValue))
            )}
          </S.Board>
        )}
      </S.GameWrapper>
    </S.Container>
  );
}
