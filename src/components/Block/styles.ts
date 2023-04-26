import { Direction } from "@interfaces";
import { rem } from "polished";
import styled, { css } from "styled-components";
import { getHeadBorderRadius, getTailBorderRadius } from "./utils";

export const SnakeHead = styled.div<{ direction: Direction }>`
  ${({ direction }) => css`
    width: ${rem(21)};
    height: ${rem(23)};

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #60cbff;

    ${getHeadBorderRadius(direction)}
  `}
`;

export const SnakeBody = styled.div`
  width: ${rem(21)};
  height: ${rem(23)};

  background-color: #60cbff;
`;

export const SnakeTail = styled.div<{ direction: Direction }>`
  ${({ direction }) => css`
    width: ${rem(21)};
    height: ${rem(23)};

    background-color: #60cbff;

    ${getTailBorderRadius(direction)}
  `}
`;

export const Food = styled.div`
  width: ${rem(21)};
  height: ${rem(23)};

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ff003d;
  border-radius: 50%;
`;

export const BoardBlock = styled.div`
  width: ${rem(21)};
  height: ${rem(23)};

  display: flex;
  align-items: center;
  justify-content: center;
`;
