import { opacity } from "@animations";
import { rem } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 0;
`;

export const Content = styled.div`
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${rem(20)};

  animation: ${opacity} 1s infinite alternate-reverse ease-out;

  h3 {
    font-size: ${rem(20)};
    color: #88c6dc;
    text-align: center;

    width: ${rem(400)};
  }

  img {
    width: ${rem(250)};
  }
`;
