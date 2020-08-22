/** @jsx jsx */
import { jsx, SerializedStyles } from "@emotion/core";
import { FunctionComponent, useState, useEffect } from "react";
import ImageSlideshow from "./ImageSlideshow";

interface ImageSlideshowProps {
  /** Array of image `src`s to render */
  children: string[];

  /** Number of seconds to wait in between each image */
  secondsBetweenImages?: number;

  /** Optional styles to pass down to each <img /> */
  imageStyles?: SerializedStyles;

  /** How wide images are */
  imageWidthPx: number;

  /** How tall images are */
  imageHeightPx: number;
}

const TimedImageSlideshow: FunctionComponent<ImageSlideshowProps> = ({
  children,
  imageStyles,
  secondsBetweenImages = 3,
  imageWidthPx,
  imageHeightPx,
}) => {
  // this is the image currently being displayed; it is faded out when it is displayed
  // (it will have been faded in before becoming the current index)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // timeout used to swap images
  const [currentTimeout, setCurrentTimeout] = useState<number | undefined>(
    undefined
  );

  /** Sets a timeout to move on to the next image, looping around when it hits the end */
  const nextImageTimer = () => {
    if (currentTimeout) {
      window.clearTimeout(currentTimeout);
      setCurrentTimeout(undefined);
    }

    const timeout = window.setTimeout(() => {
      if (currentImageIndex === children.length - 1) {
        setCurrentImageIndex(0);
      } else {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    }, secondsBetweenImages * 1000);

    setCurrentTimeout(timeout);

    return timeout;
  };

  // this useEffect will cause the timeout to be set every time `currentImageIndex` changes...
  // the timeout itself then changes the image, causing this to run again
  useEffect(() => {
    const timeout = nextImageTimer();

    return () => {
      window.clearTimeout(timeout);
    };
  }, [currentImageIndex, children]);

  useEffect(() => {
    const timeout = nextImageTimer();

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <ImageSlideshow
      currentImageIndex={currentImageIndex}
      imageStyles={imageStyles}
      imageWidthPx={imageWidthPx}
      imageHeightPx={imageHeightPx}
      secondsBetweenImages={secondsBetweenImages}
    >
      {children}
    </ImageSlideshow>
  );
};

export default TimedImageSlideshow;
