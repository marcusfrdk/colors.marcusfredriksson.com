import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { prominent } from "color.js";
import { CSSTransition } from "react-transition-group";
import { BREAKPOINT_MOBILE } from "utils/constants";
import { css } from "@emotion/react";

const timeout = 512;

const ExtractPage = () => {
  const [statePreviewUrl, setStatePreviewUrl] = useState<string>("");
  const [stateColors, setStateColors] = useState<string[]>([]);
  const [stateNumberOfColors, setStateNumberOfColors] = useState(5);
  const [stateIsLoading, setStateIsLoading] = useState(false);

  const browserRef = useRef<HTMLInputElement>(null);

  const handleOnDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setStateIsLoading(true);
    try {
      const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
      const url = URL.createObjectURL(file);
      const colors = (await prominent(url, {
        format: "hex",
        amount: stateNumberOfColors,
      })) as string[];
      setStatePreviewUrl(url);
      setStateColors(colors);
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
        in={Boolean(statePreviewUrl)}
        timeout={timeout}
        classNames="preview"
        unmountOnExit
      >
        <Preview
          src={statePreviewUrl}
          onDragOver={handleOnDragOver}
          onDrop={handleUpload}
          onClick={handleOnClick}
          css={css`
            box-shadow: 0 0 2rem 1rem ${stateColors[0] + "50"};
          `}
        />
      </CSSTransition>
      {Boolean(!statePreviewUrl) && (
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
        {stateColors.map((color, index) => (
          <div
            key={index}
            css={css`
              background-color: ${color};
            `}
          />
        ))}
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
      <CSSTransition
        in={stateIsLoading}
        timeout={256}
        classNames="loading"
        unmountOnExit
      >
        <Loading>Loading image...</Loading>
      </CSSTransition>
    </Page>
  );
};

const Loading = styled.p`
  --extract-loading: calc(var(--header-height) + 2rem);
  padding: 0.5rem 1rem;
  background-color: #fff;
  border: 1px solid #bfbfbf;
  border-radius: 999px;
  color: #999999;
  position: fixed;
  top: 5rem;
  transition: top 256ms ease;
  @media screen and (max-width: ${BREAKPOINT_MOBILE}) {
    --extract-loading: calc(var(--header-height) + 1rem);
  }
  .loading-enter {
    top: 0;
  }
  .loading-enter-active {
    top: 5rem;
  }
  .loading-exit {
    top: 5rem;
  }
  .loading-exit-active {
    top: 0;
  }
`;

const Preview = styled.img`
  transition: ${timeout}ms ease-in-out;
  transition-property: height, width;
  border-radius: 1rem;
  position: relative;
  z-index: 2;

  &.preview-enter {
    height: 0;
    width: 0;
  }
  &.preview-enter-active {
    height: auto;
    width: auto;
  }
  &.preview-exit {
    height: auto;
    width: auto;
  }
  &.preview-exit-active {
    height: 0;
    width: 0;
  }

  max-height: 50vh;
  max-width: calc(100vw - 2rem);
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
  display: flex;
  margin-top: 4rem;
  max-width: calc(100vw - 4rem);
  position: relative;
  z-index: 2;
  transition: margin-top 256ms ease;
  & > div {
    height: auto;
    width: 4rem;
    aspect-ratio: 1/1;
    border-radius: 0.5rem;
    transition: margin-left 256ms ease;
    &:not(:first-of-type) {
      margin-left: 1rem;
      @media screen and (max-width: ${BREAKPOINT_MOBILE}) {
        margin-left: 0.5rem;
      }
    }
  }

  @media screen and (max-width: ${BREAKPOINT_MOBILE}) {
    margin-top: 3rem;
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
