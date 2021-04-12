import { getRandomNumberInRange } from "../util";

/** Represents a ✨sparkle✨ */
export type SparkleType = ReturnType<typeof generateSparkle>;

/**
 * Generate a sparkle
 * @param color Color of sparkle
 */
export const generateSparkle = (color: string, minSize = 10, maxSize = 20) => {
  const sparkle = {
    id: String(getRandomNumberInRange(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: getRandomNumberInRange(minSize, maxSize),
    style: {
      top: getRandomNumberInRange(0, 100) + "%",
      left: getRandomNumberInRange(0, 100) + "%",
    },
  };
  return sparkle;
};
