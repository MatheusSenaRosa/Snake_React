import styled, { css } from "styled-components";
import { rem, shade } from "polished";
import { Direction } from "./interfaces";

export const Container = styled.main`
  height: 100vh;

  background-color: ${shade(0.7, "#e3f2fd")};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GameWrapper = styled.div`
  border-radius: ${rem(5)} ${rem(5)} 0 0;
  overflow: hidden;

  width: ${rem(630)};
`;

export const Header = styled.header`
  background-color: #293447;

  padding: 0 ${rem(20)};
  height: ${rem(62)};

  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: ${rem(19)};
    font-weight: 500;
    color: #88c6dc;
  }
`;

export const Board = styled.section`
  display: flex;
  flex-wrap: wrap;

  background-color: #212837;
`;

export const BoardBlock = styled.div`
  width: ${rem(21)};
  height: ${rem(23)};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SnakeHead = styled.div<{ direction: Direction }>`
  ${({ direction }) => css`
    width: ${rem(21)};
    height: ${rem(23)};

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    :after {
      content: "";
      position: absolute;

      background-color: #60cbff;
      width: ${rem(21)};
      height: ${rem(23)};

      border-radius: 50% 50% 0 0;
    }

    ${() => {
      switch (direction) {
        case "Up":
          return css`
            img {
              transform: rotate(180deg);
              margin-bottom: ${rem(35)};
            }

            :after {
              border-radius: 50% 50% 0 0;
            }
          `;

        case "Down":
          return css`
            img {
              transform: rotate(180deg);
              margin-bottom: ${rem(-35)};
            }

            :after {
              border-radius: 0 0 50% 50%;
            }
          `;

        case "Left":
          return css`
            img {
              transform: rotate(-90deg);
              margin-right: ${rem(35)};
            }

            :after {
              border-radius: 50% 0 0 50%;
            }
          `;

        case "Right":
          return css`
            img {
              transform: rotate(90deg);
              margin-right: ${rem(-35)};
            }

            :after {
              border-radius: 0 50% 50% 0;
            }
          `;

        default:
          return css`
            img {
              transform: rotate(180deg);
              margin-bottom: ${rem(35)};
            }

            :after {
              border-radius: 50% 50% 0 0;
            }
          `;
      }
    }}
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

    ${() => {
      switch (direction) {
        case "Up":
          return css`
            border-radius: 0 0 50% 50%;
          `;

        case "Down":
          return css`
            border-radius: 50% 50% 0 0;
          `;

        case "Left":
          return css`
            border-radius: 0 50% 50% 0;
          `;

        case "Right":
          return css`
            border-radius: 50% 0 0 50%;
          `;

        default:
          "";
      }
    }}
  `}
`;

export const Food = styled.div`
  width: ${rem(21)};
  height: ${rem(23)};

  display: flex;
  align-items: center;
  justify-content: center;

  :after {
    content: "";

    width: ${rem(21)};
    height: ${rem(21)};
    border-radius: 50%;

    background-color: #ff003d;
  }
`;
