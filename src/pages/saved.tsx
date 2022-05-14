import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Button from "components/Button";
import useColor from "contexts/color/useColor";
import getTextColorFromHex from "utils/getTextColorFromHex";
import { AiFillHeart as Heart } from "react-icons/ai";
import { IoIosCopy as Copy } from "react-icons/io";
import getHoverColorFromHex from "utils/getHoverColorFromHex";
import copyToClipboard from "utils/copyToClipboard";
import useMessage from "contexts/message/useMessage";
import { useRouter } from "next/router";
import SEO from "components/SEO";

const SavedPage = () => {
  const { savedColors, unsaveColor } = useColor();
  const { newToast } = useMessage();
  const router = useRouter();

  return (
    <Page>
      <SEO
        title="Saved Colors | Talmio Colors"
        description="View and manage your saved colors."
      />
      {savedColors.length === 0 ? (
        <NoSavedColorsMessage>No saved colors added</NoSavedColorsMessage>
      ) : (
        <Colors>
          {savedColors.map((color, index) => (
            <Color
              key={index}
              css={css`
                background-color: ${color};
                & > div > p,
                & > div > svg {
                  color: ${getTextColorFromHex(color)};
                  fill: ${getTextColorFromHex(color)};
                }
                & > div:not(.background) {
                  @media screen and (hover: hover) {
                    &:hover {
                      background-color: ${getHoverColorFromHex(color)};
                    }
                  }
                }
              `}
            >
              <Background
                className="background"
                onClick={() =>
                  router.push(`/shades?color=${encodeURIComponent(color)}`)
                }
              />
              <div
                onClick={() => {
                  const success = copyToClipboard(color);
                  newToast(
                    success
                      ? `'${color}' copied to clipboard`
                      : "Failed to copy value to clipboard"
                  );
                }}
              >
                <p>{color}</p>
                <Copy size="1rem" />
              </div>
              <Button Icon={Heart} onClick={() => unsaveColor(color)} />
            </Color>
          ))}
        </Colors>
      )}
    </Page>
  );
};

const Color = styled.li`
  display: flex;
  align-items: center;
  padding: 2rem;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  max-width: 100vw;
  & > div:not(.background) {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: background-color 64ms ease;
    z-index: 2;
    cursor: pointer;
    & > p {
      margin-right: 0.5rem;
    }
  }
  & > .button {
    position: relative;
    z-index: 3;
  }
`;

const Colors = styled.ul`
  list-style: none;
  position: relative;
`;

const NoSavedColorsMessage = styled.p`
  height: calc(var(--viewport-height) - var(--header-height));
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--weak);
`;

const Background = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
  top: 0;
  left: 0;
`;

const Page = styled.main`
  min-height: var(--viewport-height);
  position: relative;
  padding-top: var(--header-height);
`;

export default SavedPage;
