import { Direction } from "@interfaces";
import * as S from "./styles";

type Props = {
  type: string;
  direction: Direction;
};

export function Block({ direction, type }: Props) {
  if (type === "head") return <S.SnakeHead direction={direction} />;

  if (type === "body") return <S.SnakeBody />;

  if (type.includes("tail")) {
    const tailDirection = type.split(".")[1] as Direction;
    return <S.SnakeTail key={type} direction={tailDirection} />;
  }

  if (type === "food") return <S.Food />;

  return <S.BoardBlock />;
}
