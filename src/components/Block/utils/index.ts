import { Direction } from "@interfaces";
import { css } from "styled-components";

export const getHeadBorderRadius = (direction: Direction) => {
  switch (direction) {
    case "Up":
      return css`
        border-radius: 50% 50% 0 0;
      `;

    case "Down":
      return css`
        border-radius: 0 0 50% 50%;
      `;

    case "Left":
      return css`
        border-radius: 50% 0 0 50%;
      `;

    case "Right":
      return css`
        border-radius: 0 50% 50% 0;
      `;

    default:
      return css`
        border-radius: 50% 50% 0 0;
      `;
  }
};

export const getTailBorderRadius = (direction: Direction) => {
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
};
