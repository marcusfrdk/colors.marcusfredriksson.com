import styled from "@emotion/styled";
import { FaInfo as Info } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";
import { EXTRACT_ANIMATION_TIMEOUT } from "utils/constants";

const ExtractInformation = ({
  handleOnDragOver,
  handleUpload,
  imageIsLoaded,
}: Props) => {
  return (
    <CSSTransition
      in={imageIsLoaded}
      timeout={EXTRACT_ANIMATION_TIMEOUT}
      classNames="info"
      unmountOnExit
    >
      <InformationContainer
        onDragOver={handleOnDragOver}
        onDrop={handleUpload}
        className="information"
      >
        <InformationButton>
          <Info size="0.75rem" />
        </InformationButton>
        <InformationText>
          You can select another image by dropping it anywhere on the page or by
          clicking on the image.
        </InformationText>
      </InformationContainer>
    </CSSTransition>
  );
};

const InformationButton = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  background-color: var(--neutrals-50);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--weak);
`;

const InformationText = styled.p`
  background-color: var(--neutrals-0);
  padding: 1rem;
  border-radius: 1rem;
  border-top-right-radius: 0.25rem;
  color: var(--weak);
  position: absolute;
  top: 3rem;
  right: 3rem;
  width: 24rem;
  max-width: calc(100vw - 2rem - 2rem);
  pointer-events: none;
  opacity: 0;
  box-shadow: 0 0 1rem 0.5rem #1c1c1c10;
  transition: opacity 256ms ease;
`;

const InformationContainer = styled.div`
  position: absolute;
  top: calc(var(--header-height));
  right: 0;
  padding: 1rem;
  transition: opacity ${EXTRACT_ANIMATION_TIMEOUT}ms ease;
  user-select: none;
  z-index: 3;
  transition-delay: ${EXTRACT_ANIMATION_TIMEOUT}ms;
  opacity: 1;
  &:hover {
    & > p {
      opacity: 1;
    }
  }

  &.info-enter {
    opacity: 0;
  }

  &.info-enter-active {
    opacity: 1;
  }

  &.info-exit {
    transition: none !important;
    opacity: 1;
  }

  &.info-exit-active {
    transition: none !important;
    opacity: 0;
  }
`;

type Props = {
  handleOnDragOver: (e: any) => void;
  handleUpload: (e: any) => void;
  imageIsLoaded: boolean;
};

export default ExtractInformation;
