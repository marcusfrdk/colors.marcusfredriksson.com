import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { prominent } from "color.js";
import { CSSTransition } from "react-transition-group";
import {
  BREAKPOINT_MOBILE,
  MAX_NUMBER_OF_EXTRACT_COLORS,
} from "utils/constants";
import { css } from "@emotion/react";

import { FaInfo as Info } from "react-icons/fa";
import SelectNumberOfColors from "components/SelectNumberOfColors";

const timeout = 512;

const ExtractPage = () => {
  const [statePreviewUrl, setStatePreviewUrl] = useState<string>("");
  const [stateImageIsLoaded, setStateImageIsLoaded] = useState(false);
  const [stateColors, setStateColors] = useState<string[]>([]);
  const [stateNumberOfColors, setStateNumberOfColors] = useState(5);
  const [stateIsLoading, setStateIsLoading] = useState(false);
  const [stateHasChanged, setStateHasChanged] = useState(false);

  const browserRef = useRef<HTMLInputElement>(null);

  const handleOnDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setStateIsLoading(true);
    setStateHasChanged(true);
    setStateImageIsLoaded(false);

    try {
      const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
      const url = URL.createObjectURL(file);
      const colors = (await prominent(url, {
        format: "hex",
        amount: MAX_NUMBER_OF_EXTRACT_COLORS,
      })) as string[];
      setTimeout(() => {
        setStatePreviewUrl(url);
        setStateColors(colors);
        setStateImageIsLoaded(true);
      }, timeout);
    } catch (err) {
      console.log("Something went wrong...");
    }
    setStateIsLoading(false);
  };

  const handleOnClick = () =>
    browserRef?.current ? browserRef.current.click() : null;

  return (
    <Page>
      <CSSTransition
        in={stateImageIsLoaded}
        timeout={timeout}
        classNames="preview"
        unmountOnExit
      >
        <PreviewContainer shadowColor={stateColors[0]}>
          <Preview
            src={statePreviewUrl}
            alt=""
            onDragOver={handleOnDragOver}
            onDrop={handleUpload}
            onClick={handleOnClick}
            // css={css`
            //   box-shadow: 0 0 2rem 1rem ${stateColors[0] + "50"};
            // `}
          />
          <InformationContainer
            onDragOver={handleOnDragOver}
            onDrop={handleUpload}
          >
            <InformationButton>
              <Info size="0.75rem" />
            </InformationButton>
            <InformationText>
              You can select another image by dropping it anywhere on the page
              or by clicking on the image.
            </InformationText>
          </InformationContainer>
        </PreviewContainer>
      </CSSTransition>
      {Boolean(!statePreviewUrl) && !stateHasChanged && (
        <PreUploadInformation>
          <button
            onDragOver={handleOnDragOver}
            onDrop={handleUpload}
            onClick={handleOnClick}
          >
            Select image
          </button>
          <p>...or drag and drop a file</p>
        </PreUploadInformation>
      )}
      <Colors>
        {stateColors.map((color, index) =>
          index <= stateNumberOfColors - 1 ? (
            <div
              key={index}
              css={css`
                background-color: ${color};
              `}
            />
          ) : null
        )}
      </Colors>
      <FileBrowser
        type="file"
        ref={browserRef}
        multiple={false}
        accept="image/*"
        onChange={handleUpload}
      />
      <Dropzone
        onDragOver={handleOnDragOver}
        onDrop={handleUpload}
        className={statePreviewUrl ? "has-image" : ""}
      />
      {stateIsLoading && <Loading>Image is loading...</Loading>}
      <SelectNumberOfColors
        numberOfColors={stateNumberOfColors}
        setNumberOfColors={setStateNumberOfColors}
      />
    </Page>
  );
};

// label={`Showing ${index + 1} color${index === 0 ? "" : "s"}`}

const Loading = styled.p`
  padding: 0.5rem 1rem;
  background-color: #fff;
  border: 1px solid #bfbfbf;
  border-radius: 999px;
  color: #999999;
  position: fixed;
  top: calc(var(--header-height) + 2rem);
  @media screen and (max-width: ${BREAKPOINT_MOBILE}) {
    top: calc(var(--header-height) + 1rem);
  }
`;

const Preview = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 1rem;
`;

type PreviewContainerProps = {
  shadowColor: string;
};

const PreviewContainer = styled.div`
  --preview-container-box-shadow: 0 0 2.5rem 0.5rem
    ${(props: PreviewContainerProps) => props.shadowColor + "50"};
  transition: ${timeout}ms ease-in-out;
  transition-property: width, height, max-height, max-width, box-shadow;
  position: relative;
  z-index: 2;
  border-radius: 1rem;

  max-height: 50vh;
  max-width: calc(100vw - 2rem);
  /* height: 100%;
  width: 100%; */
  object-fit: contain;
  box-shadow: var(--preview-container-box-shadow);

  & > div {
    opacity: 1;
  }

  &.preview-enter {
    max-height: 0;
    max-width: 0;
    box-shadow: 0;
    & > div {
      opacity: 0;
    }
  }
  &.preview-enter-active {
    max-height: 50vh;
    max-width: calc(100vw - 2rem);
    box-shadow: var(--preview-container-box-shadow);
    & > div {
      opacity: 1;
    }
  }
  &.preview-exit {
    max-height: 50vh;
    max-width: calc(100vw - 2rem);
    box-shadow: var(--preview-container-box-shadow);
    & > div {
      opacity: 1;
    }
  }
  &.preview-exit-active {
    max-height: 0;
    max-width: 0;
    box-shadow: 0;
    & > div {
      opacity: 0;
    }
  }
`;

const Dropzone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--viewport-height);
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const FileBrowser = styled.input`
  display: none;
`;

const PreUploadInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  pointer-events: none;
  & > button {
    pointer-events: all;
    height: 3rem;
    width: fit-content;
    padding: 0 2rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #1c1c1c;
    color: #ffffff;
    font-size: 0.875rem;
    font-weight: var(--font-medium);
    margin-bottom: 1rem;
    cursor: pointer;
    transition: background-color 64ms ease;
    @media screen and (hover: hover) {
      &:hover {
        background-color: #2c2c2c;
      }
    }
  }

  & > p {
    color: #999999;
  }
`;

const Colors = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
  max-width: calc(100vw - 4rem);
  margin-top: 4rem;
  position: relative;
  z-index: 2;
  transition: 256ms ease;
  transition-property: margin-top, grid-gap, max-width;
  & > div {
    width: 4rem;
    aspect-ratio: 1/1;
    border-radius: 0.5rem;
    transition: ${timeout}ms ease;
    transition-property: background-color, margin-left;
  }

  @media screen and (max-width: ${BREAKPOINT_MOBILE}) {
    margin-top: 3rem;
    grid-gap: 0.5rem;
  }
`;

const InformationButton = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  background-color: #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
`;

const InformationText = styled.p`
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.5rem;
  color: #999999;
  position: absolute;
  top: 3rem;
  right: 3rem;
  width: 24rem;
  max-width: calc(100vw - 2rem - 4rem);
  pointer-events: none;
  opacity: 0;
  box-shadow: 0 0 1rem 0.5rem #1c1c1c15;
`;

const InformationContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1.5rem;
  transition: opacity ${timeout}ms ease;
  user-select: none;
  &:hover {
    & > p {
      opacity: 1;
    }
  }
`;

const Page = styled.main`
  height: var(--viewport-height);
  padding-top: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default ExtractPage;
