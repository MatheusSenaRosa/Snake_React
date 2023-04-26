import { ArrowKeysImg } from "@assets";
import { Portal } from "../Portal";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
};

export function StartModal({ isOpen }: Props) {
  return (
    <Portal>
      {isOpen && (
        <S.Container>
          <S.Overlay aria-hidden="true" />
          <S.Content>
            <h3>Pressione qualquer tecla de movimento para iniciar o jogo</h3>

            <img src={ArrowKeysImg} alt="Arrow keys" />
          </S.Content>
        </S.Container>
      )}
    </Portal>
  );
}
