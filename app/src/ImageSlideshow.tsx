/** @jsx jsx */
import { jsx, css, keyframes, SerializedStyles } from "@emotion/core";
import { FunctionComponent } from "react";

const baseImageStyle = css`
  position: absolute;
`;

const fadeOutKeyframes = keyframes`
    0% {
        opacity: 100%;
    }
    100% {
        opacity: 0%;
    }    
`;

const fadeInKeyframes = keyframes`
    0% {
        opacity: 0%;
    }
    100% {
        opacity: 100%;
    }
`;

const containerStyle = css`
  position: relative;
`;

interface ImageSlideshowProps {
  /** Array of image `src`s to render */
  children: string[];

  /** Current image to display */
  currentImageIndex: number;

  /** Number of seconds to wait in between each image */
  secondsBetweenImages?: number;

  /** Optional styles to pass down to each <img /> */
  imageStyles?: SerializedStyles;

  /** How wide images are */
  imageWidthPx: number;

  /** How tall images are */
  imageHeightPx: number;
}

/**
 * Get the style to use to fade in/out/hide an image
 * @param currentImageIndex Index of current image being displayed
 * @param thisImageIndex Index of the image to get styles for
 * @param images Array of all images
 */
const getStyleForImage = (
  currentImageIndex: number,
  thisImageIndex: number,
  images: string[],
  secondsBetweenImages: number
): SerializedStyles => {
  if (currentImageIndex === thisImageIndex) {
    // if we're on this image, fade it out...
    return css`
      animation: ${fadeOutKeyframes} ${secondsBetweenImages}s ease;
    `;
  } else if (
    // while fading in the next one...
    currentImageIndex + 1 === thisImageIndex ||
    // if we're on the last one, we want to re-fade-in the first one
    (thisImageIndex === 0 && currentImageIndex === images.length - 1)
  ) {
    return css`
      animation: ${fadeInKeyframes} ${secondsBetweenImages}s ease;
    `;
  } else {
    // otherwise, we don't show it at all!
    return css`
      display: none;
    `;
  }
};

const ImageSlideshow: FunctionComponent<ImageSlideshowProps> = ({
  children,
  currentImageIndex,
  secondsBetweenImages = 3,
  imageStyles,
  imageWidthPx,
  imageHeightPx,
}) => {
  return (
    <div
      css={css`
        ${containerStyle}
        
        width: ${imageWidthPx}px;
        height: ${imageHeightPx}px;
    `}
    >
      {/* We render all the images at once, but they each get different animations based on `currentImageIndex` */}
      {children.map((image, index) => (
        <img
          alt=""
          key={`slideshow-${image}`}
          src={image}
          css={css`
            ${baseImageStyle}
            ${imageStyles}

            width: ${imageWidthPx}px;
            height: ${imageHeightPx}px;

            ${getStyleForImage(
              currentImageIndex,
              index,
              children,
              secondsBetweenImages
            )}
          `}
        />
      ))}
    </div>
  );
};

export default ImageSlideshow;
