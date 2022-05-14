import styled from "@emotion/styled";
import SelectNumberOfColors from "components/SelectNumberOfColors";
import ExtractedColors from "components/ExtractedColors";
import { useRef, useState } from "react";
import { prominent } from "color.js";
import { CSSTransition } from "react-transition-group";
import { FaInfo as Info } from "react-icons/fa";
import {
  BREAKPOINT_MOBILE,
  MAX_NUMBER_OF_EXTRACT_COLORS,
} from "utils/constants";

const timeout = 512;

const ExtractPage = () => {
  const [statePreviewUrl, setStatePreviewUrl] = useState<string>("");
  const [stateImageIsLoaded, setStateImageIsLoaded] = useState(false);
  const [stateColors, setStateColors] = useState<string[]>([]);
  const [stateNumberOfColors, setStateNumberOfColors] = useState(5);
  const [stateIsLoading, setStateIsLoading] = useState(false);
  const [stateHasChanged, setStateHasChanged] = useState(false);
  const [stateWidth, setStateWidth] = useState(0);
  const [stateHeight, setStateHeight] = useState(0);

  const browserRef = useRef<HTMLInputElement>(null);

  const handleOnDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setStateIsLoading(true);
    setStateImageIsLoaded(false);
    setStateHasChanged(true);

    try {
      const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
      const url = URL.createObjectURL(file);
      const colors = (await prominent(url, {
        format: "hex",
        amount: MAX_NUMBER_OF_EXTRACT_COLORS,
      })) as string[];

      const img = new Image();
      img.src = url;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        const maxWidth =
          window.innerWidth -
          parseFloat(getComputedStyle(document.documentElement).fontSize) * 2;
        const maxHeight = window.innerHeight / 2;
        const aspectRatio = Math.max(width, height) / Math.min(width, height);

        // Excuse this mess (this is only temporary)
        if (width > height) {
          console.log("Is landscape");
          height = maxHeight;
          width = height * aspectRatio;

          if (width > maxWidth) {
            width = maxWidth;
            height = width / aspectRatio;
          }
        } else {
          console.log("Is portrait");
          height = maxHeight;
          width = height / aspectRatio;

          if (width > maxWidth) {
            width = maxWidth;
            height = width / aspectRatio;
          }
        }

        // setStateIsPortrait(img.height > img.width);
        setTimeout(() => {
          setStatePreviewUrl(url);
          setStateColors(colors);
          setStateWidth(width);
          setStateHeight(height);
          setStateImageIsLoaded(true);
        }, timeout);
      };
    } catch (err) {
      console.log(err);
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
        <PreviewContainer
          shadowColor={stateColors[0]}
          width={stateWidth}
          height={stateHeight}
        >
          <Preview
            src={statePreviewUrl}
            alt=""
            onDragOver={handleOnDragOver}
            onDrop={handleUpload}
            onClick={handleOnClick}
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
      <ExtractedColors
        colors={stateColors}
        numberOfColors={stateNumberOfColors}
        imageIsLoaded={stateImageIsLoaded}
      />
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
  position: relative;
`;

const PreviewContainer = styled.div<{
  shadowColor: string;
  width: number;
  height: number;
}>`
  --preview-container-box-shadow: 0 0 2.5rem 0.5rem
    ${(props) => props.shadowColor + "50"};

  transition: ${timeout}ms ease-in-out;
  transition-property: width, height, box-shadow;
  position: relative;
  z-index: 2;
  border-radius: 1rem;

  /* max-height: 50vh;
  max-width: calc(100vw - 2rem); */
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  box-shadow: var(--preview-container-box-shadow);

  & > div {
    opacity: 1;
  }

  &.preview-enter {
    height: 0;
    width: 0;
    box-shadow: 0;
    & > div {
      opacity: 0;
    }
  }
  &.preview-enter-active {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    box-shadow: var(--preview-container-box-shadow);
    & > div {
      opacity: 1;
    }
  }
  &.preview-exit {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    box-shadow: var(--preview-container-box-shadow);
    & > div {
      opacity: 1;
    }
  }
  &.preview-exit-active {
    height: 0;
    width: 0;
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
