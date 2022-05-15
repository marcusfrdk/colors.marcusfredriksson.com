import styled from "@emotion/styled";
import SelectNumberOfColors from "components/SelectNumberOfColors";
import ExtractedColors from "components/ExtractedColors";
import getImageDimensions from "utils/getImageDimensions";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { prominent } from "color.js";
import { CSSTransition } from "react-transition-group";

import {
  BREAKPOINT_MOBILE,
  DEFAULT_NUMBER_OF_EXTRACT_COLORS,
  EXTRACT_ANIMATION_TIMEOUT,
  MAX_NUMBER_OF_EXTRACT_COLORS,
} from "utils/constants";
import hexToHsl from "utils/hexToHsl";
import SEO from "components/SEO";
import ExtractInformation from "components/ExtractInformation";
import { FaTimes as Close } from "react-icons/fa";

const ExtractPage = () => {
  const [statePreviewUrl, setStatePreviewUrl] = useState<string>("");
  const [stateImageIsLoaded, setStateImageIsLoaded] = useState(false);
  const [stateColors, setStateColors] = useState<string[]>([]);
  const [stateIsLoading, setStateIsLoading] = useState(false);
  const [stateHasChanged, setStateHasChanged] = useState(false);
  const [stateIsChanging, setStateIsChanging] = useState(false);
  const [stateWidth, setStateWidth] = useState(0);
  const [stateHeight, setStateHeight] = useState(0);
  const [stateDimensions, setStateDimensions] = useState<number[]>([0, 0]);
  const [stateError, setStateError] = useState(false);
  const [stateNumberOfColors, setStateNumberOfColors] = useState(
    DEFAULT_NUMBER_OF_EXTRACT_COLORS
  );

  const browserRef = useRef<HTMLInputElement>(null);

  const handleOnDragOver = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  const handleOnClick = useCallback(
    () => (browserRef?.current ? browserRef.current.click() : null),
    [browserRef]
  );

  const handleClose = useCallback(() => {
    setStateIsChanging(true);
    setStateHasChanged(false);
    setStateError(false);
    setStateImageIsLoaded(false);
    setStateIsLoading(false);

    setTimeout(() => {
      setStatePreviewUrl("");
      setStateColors([]);
      setStateIsChanging(false);
    }, EXTRACT_ANIMATION_TIMEOUT);
  }, []);

  const resizeDimensions = useCallback((width: number, height: number) => {
    const [newWidth, newHeight] = getImageDimensions(width, height);
    setStateHeight(newHeight);
    setStateWidth(newWidth);
  }, []);

  const handleUpload = useCallback(
    async (e: any) => {
      e.preventDefault();
      setStateIsLoading(true);

      try {
        const file = e.target.files
          ? e.target.files[0]
          : e.dataTransfer.files[0];

        if (!file) return;

        if (statePreviewUrl) {
          setStateIsChanging(true);
        }

        // setStateImageIsLoaded(false);
        setStateHasChanged(true);
        setStateError(false);

        const url = URL.createObjectURL(file);
        const img = new Image();
        img.src = url;
        img.onload = async () => {
          const colors = (await prominent(img, {
            format: "hex",
            amount: MAX_NUMBER_OF_EXTRACT_COLORS,
            group: 30,
            sample: 75,
          })) as string[];

          resizeDimensions(img.width, img.height);

          setTimeout(() => {
            setStatePreviewUrl(url);
            setStateColors(colors);
            setStateDimensions([img.width, img.height]);
            setStateImageIsLoaded(true);
            setStateIsChanging(false);
          }, EXTRACT_ANIMATION_TIMEOUT);
        };
      } catch (err) {
        process.env.NODE_ENV === "development" && console.log(err);
        handleClose();
      }
      setStateIsLoading(false);
    },
    [
      handleClose,
      resizeDimensions,
      setStateDimensions,
      statePreviewUrl,
      setStateIsChanging,
    ]
  );

  useEffect(() => {
    const handleResize = () => {
      const newState = [...stateDimensions];
      resizeDimensions(newState[0], newState[1]);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [resizeDimensions, stateDimensions]);

  const functionProps = useMemo(() => {
    return {
      onDragOver: handleOnDragOver,
      onDrop: handleUpload,
      onClick: handleOnClick,
    };
  }, [handleOnDragOver, handleUpload, handleOnClick]);

  return (
    <Page>
      <SEO
        title="Extract | Talmio Colors"
        description="Extract the prominent colors from an image."
      />
      {!stateError && (
        <CSSTransition
          in={stateImageIsLoaded}
          timeout={EXTRACT_ANIMATION_TIMEOUT}
          classNames="preview"
          unmountOnExit
        >
          <PreviewContainer width={stateWidth} height={stateHeight}>
            <Preview
              src={statePreviewUrl}
              alt=""
              color={stateColors[0]}
              shadowColor={stateColors[0]}
              {...functionProps}
              className={stateIsChanging ? "is-changing" : ""}
            />
            <CloseButton {...functionProps} onClick={handleClose}>
              <div>
                <Close size="1rem" />
              </div>
            </CloseButton>
          </PreviewContainer>
        </CSSTransition>
      )}
      {Boolean(!statePreviewUrl) && !stateHasChanged && (
        <PreUploadInformation
          onDragOver={handleOnDragOver}
          onDrop={handleUpload}
        >
          <button {...functionProps}>Select image</button>
          <p>...or drag and drop a file</p>
          {stateError && (
            <p className="error">
              Something went wrong loading the image, please try again
            </p>
          )}
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
      {Boolean(!statePreviewUrl) && !stateHasChanged && (
        <>
          <SelectNumberOfColors
            numberOfColors={stateNumberOfColors}
            setNumberOfColors={setStateNumberOfColors}
          />
        </>
      )}
      <ExtractInformation
        handleOnDragOver={handleOnDragOver}
        handleUpload={handleUpload}
        imageIsLoaded={stateImageIsLoaded}
      />
    </Page>
  );
};

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  padding: 1rem;
  cursor: pointer;
  transition: opacity ${EXTRACT_ANIMATION_TIMEOUT}ms ease;
  & > div {
    border-radius: 50%;
    height: 1.5rem;
    width: 1.5rem;
    background-color: var(--neutrals-50);
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      fill: var(--weak);
    }
    @media screen and (hover: hover) {
      &:hover {
        background-color: var(--neutrals-100);
      }
    }
  }
`;

const Loading = styled.p`
  padding: 0.5rem 1rem;
  background-color: var(--neutrals-0);
  border: 1px solid var(--neutrals-200);
  border-radius: 999px;
  color: var(--weak);
  position: fixed;
  top: calc(var(--header-height) + 2rem);
  @media screen and (max-width: ${BREAKPOINT_MOBILE}) {
    top: calc(var(--header-height) + 1rem);
  }
`;

const Preview = styled.img<{
  shadowColor: string;
  color: string;
}>`
  height: 100%;
  width: 100%;
  border-radius: 1rem;
  position: relative;
  border: none;
  outline: none;
  display: inline-block;
  box-shadow: 0 0 3rem 0.5rem
    ${(props) =>
      hexToHsl(props.color).l > 75 ? "#00000015" : props.shadowColor + "75"};
  transition: ${EXTRACT_ANIMATION_TIMEOUT}ms ease;
  transition-property: filter, box-shadow;
  overflow: hidden;

  filter: blur(0);
  -webkit-filter: blur(0);
  -moz-filter: blur(0);
  -o-filter: blur(0);
  -ms-filter: blur(0);

  &.is-changing {
    filter: blur(0.5rem);
    -webkit-filter: blur(0.5rem);
    -moz-filter: blur(0.5rem);
    -o-filter: blur(0.5rem);
    -ms-filter: blur(0.5rem);

    @media screen and (max-width: ${BREAKPOINT_MOBILE}) {
      filter: blur(0.25rem);
      -webkit-filter: blur(0.25rem);
      -moz-filter: blur(0.25rem);
      -o-filter: blur(0.25rem);
      -ms-filter: blur(0.25rem);
    }
  }
`;

const PreviewContainer = styled.div<{
  width: number;
  height: number;
}>`
  transition: ${EXTRACT_ANIMATION_TIMEOUT}ms ease-in-out;
  transition-property: width, height;
  position: relative;
  z-index: 2;
  border-radius: 1rem;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  max-height: 50vh;
  max-width: calc(100vw - 2rem);

  & > div {
    transition-delay: ${EXTRACT_ANIMATION_TIMEOUT}ms;
    opacity: 1;
  }
  &.preview-enter {
    height: 0;
    width: 0;
    & > div {
      opacity: 0;
    }
  }
  &.preview-enter-active {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    & > div {
      opacity: 1;
    }
  }
  &.preview-exit {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    & > div {
      transition: none !important;
      opacity: 1;
    }
  }
  &.preview-exit-active {
    height: 0;
    width: 0;
    & > div {
      transition: none !important;
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
  pointer-events: all;
  & > button {
    pointer-events: all;
    height: 3rem;
    width: fit-content;
    padding: 0 2rem;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--primary-400);
    color: #ffffff;
    font-size: 0.875rem;
    font-weight: var(--font-medium);
    margin-bottom: 1rem;
    cursor: pointer;
    transition: background-color 64ms ease;
    @media screen and (hover: hover) {
      &:hover {
        background-color: var(--primary-500);
      }
    }
  }

  & > p {
    color: var(--weak);
  }
  & > p.error {
    color: var(--red-400);
    margin-top: 1rem;
    max-width: calc(100vw - 4rem);
  }
`;

const Page = styled.main`
  height: var(--viewport-height);
  padding-top: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow-x: hidden;
`;

export default ExtractPage;
