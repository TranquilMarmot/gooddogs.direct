/** @jsx jsx */
import { jsx, css, keyframes, SerializedStyles } from "@emotion/core";
import { FunctionComponent, useState, useEffect } from "react";

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

const fadeOutImageStyle = css`
  ${baseImageStyle}

  animation: ${fadeOutKeyframes} 2s ease;
`;

const fadeInImageStyle = css`
  ${baseImageStyle}

  animation: ${fadeInKeyframes} 2s ease;
`;

const containerStyle = css`
  display: relative;
`;

interface ImageSlideshowProps {
  images: string[];
  imageStyles?: SerializedStyles;
}

const getStyleForImage = (
  currentImageIndex: number,
  thisImageIndex: number,
  images: string[]
): SerializedStyles => {
  if (currentImageIndex === thisImageIndex) {
    // if we're on this image, fade it out...
    return fadeOutImageStyle;
  } else if (
    // while fading in the next one...
    currentImageIndex + 1 === thisImageIndex ||
    // if we're on the last one, we want to re-fade-in the first one
    (thisImageIndex === 0 && currentImageIndex === images.length - 1)
  ) {
    return fadeInImageStyle;
  } else {
    // otherwise, we don't show it at all!
    return css`
      display: none;
    `;
  }
};

const ImageSlideshow: FunctionComponent<ImageSlideshowProps> = ({
  images,
  imageStyles,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentTimeout, setCurrentTimeout] = useState<number | undefined>(
    undefined
  );

  const nextImageTimer = () => {
    if (currentTimeout) {
      window.clearTimeout(currentTimeout);
      setCurrentTimeout(undefined);
    }

    setCurrentTimeout(
      window.setTimeout(() => {
        if (currentImage === images.length - 1) {
          setCurrentImage(0);
        } else {
          setCurrentImage(currentImage + 1);
        }
      }, 2000)
    );
  };

  useEffect(nextImageTimer, [currentImage, images]);
  useEffect(nextImageTimer, []);

  return (
    <div css={containerStyle}>
      {images.map((image, index) => (
        <img
          key={`slideshow-${index}`}
          src={image}
          css={css`
            ${imageStyles}
            ${getStyleForImage(currentImage, index, images)}
          `}
        />
      ))}
    </div>
  );
};

export default ImageSlideshow;
