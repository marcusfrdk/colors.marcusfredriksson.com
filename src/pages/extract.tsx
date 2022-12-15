import styled from "@emotion/styled";
import SEO from "components/SEO";
import { ChangeEvent, useRef, useState } from "react";
import loadImage from "../utils/loadImage";
import extract from "extract-colors";
import useMessage from "contexts/message/useMessage";
import copyToClipboard from "utils/copyToClipboard";
import { FaTimes } from "react-icons/fa";

export default function Component() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const [colors, setColors] = useState<string[]>([]);
  const [src, setSrc] = useState<string>("");

  const { newToast } = useMessage();

  const handleClick = (color: string) => {
    newToast(
      copyToClipboard(color)
        ? `'${color}' copied to clipboard`
        : "Failed to copy to clipboard"
    );
  };

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    try {
      e.preventDefault();
      setDragging(false);
      if (loading || !e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      setLoading(true);

      const { imageData, src } = await loadImage(file);
      const extracted = await extract(imageData);
      const values = Object.values(extracted)
        .sort((a, b) => (a.area > b.area ? -1 : 1))
        .map(({ hex }) => hex)
        .splice(0, 8);
      setColors(values);
      setSrc(src);
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  }

  function handleClear() {
    setColors([]);
    setSrc("");
  }

  return (
    <Page>
      <SEO
        title="Extract"
        description="Extract the prominent colors from an image."
      />
      <Dropzone
        className={`${dragging ? "dragging" : ""} ${src ? "hide" : ""}`}
        onDragOver={() => setDragging(true)}
        onDragExit={() => setDragging(false)}
        onDragLeave={() => setDragging(false)}
      >
        <PreUploadInfo>
          <div>Select image</div>
          <p>...or drag and drop a file</p>
        </PreUploadInfo>
        <Input
          type="file"
          accept="image/png, image/jpeg, image/webp"
          multiple={false}
          onChange={handleUpload}
          ref={inputRef}
        />
      </Dropzone>
      <Information className={!src ? "hide" : ""}>
        <img
          src={src}
          alt="the extracted image"
          style={{
            boxShadow:
              colors.length > 0 ? `0 0 2rem 0.5rem ${colors[0]}50` : "",
            // opacity: loading ? 0.5 : 1,
            border:
              colors.length > 0 &&
              (colors.includes("#ffffff") || colors.includes("#1c1c1c"))
                ? "0.125rem solid var(--neutrals-50)"
                : "",
            filter: loading ? "blur(0.5rem)" : "",
          }}
        />
        <Close onClick={handleClear}>
          <div>
            <FaTimes fill="var(--weak)" />
          </div>
        </Close>
        {colors.length > 0 && (
          <ul className="hide-scrollbar">
            {colors.map((backgroundColor, i) => (
              <li
                key={i}
                style={{ backgroundColor }}
                onClick={() => handleClick(backgroundColor)}
              />
            ))}
          </ul>
        )}
      </Information>
    </Page>
  );
}

const PreUploadInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  & > div {
    height: 3rem;
    width: fit-content;
    padding: 0 2rem;
    border: none;
    display: flex;
    align-items: center;
    border-radius: 0.5rem;
    background-color: var(--primary-400);
    color: #ffffff;
    font-size: 0.875rem;
    font-weight: var(--font-medium);
    margin-bottom: 1rem;
  }

  & > p {
    color: var(--weak);
    display: none;
  }

  @media screen and (hover: hover) {
    & > p {
      display: block;
    }
  }
`;

const Information = styled.div`
  opacity: 1;
  position: absolute;
  left: 50%;
  top: calc(50% + 2rem);
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  pointer-events: none;
  max-width: calc(100vw - 2rem);

  & > img {
    border-radius: 1rem;
    max-width: 90vw;
    max-height: 24rem;
    transition: filter 256ms ease-in-out;
  }

  & > ul {
    list-style: none;
    display: flex;
    pointer-events: all;
    padding: 2rem;
    justify-content: center;
    flex-wrap: wrap;

    & > li {
      min-height: 3rem;
      min-width: 3rem;
      border-radius: 0.5rem;
      border: 0.125rem solid var(--neutrals-50);
      cursor: pointer;
      margin: 0 0.5rem 1rem 0.5rem;
      transition: background-color 256ms ease-in-out;
    }

    @media screen and (max-width: 48rem) {
      padding: 2rem 1rem;
    }
  }

  &.hide {
    opacity: 0;
  }
`;

const Close = styled.button`
  height: 4rem;
  width: 4rem;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  pointer-events: all;
  cursor: pointer;

  & > div {
    height: 1.5rem;
    width: 1.5rem;
    background-color: var(--neutrals-50);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.125rem solid var(--neutrals-100);
  }
`;

const Dropzone = styled.div`
  /* height: calc(var(--viewport-height) * 0.9); */
  height: calc(var(--viewport-height) - var(--header-height) - 4rem);
  width: calc(100vw - 4rem);
  border-radius: 1rem;
  border: 0.25rem dashed var(--neutrals-200);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  /* transition: 256ms ease-in-out;
  transition-property: background-color, border, height, width; */
  overflow: hidden;
  top: calc(50% + 2rem);
  left: 50%;
  transform: translate(-50%, -50%);

  &.hide {
    opacity: 0;
  }

  &.dragging {
    background-color: var(--neutrals-50);
  }
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  opacity: 0;
  position: absolute;
  cursor: pointer;
  z-index: 2;
`;

const Page = styled.main`
  width: 100vw;
  height: var(--viewport-height);
  padding-top: var(--header-height);
  position: relative;
`;
