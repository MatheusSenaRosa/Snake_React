import styled from "styled-components";
import { rem, shade } from "polished";

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
