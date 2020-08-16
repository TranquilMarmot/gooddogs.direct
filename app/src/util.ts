export const getRandomRotation = (min: number, max: number): number => {
  const rotate = Math.random() * (max - min) + min;

  return Math.random() >= 0.5 ? rotate : -rotate;
};
