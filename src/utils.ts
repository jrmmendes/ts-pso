export const generateRandomArray = (numberOfDimensions: number) => {
  const array = [];
  for (let i = 0; i < numberOfDimensions; i++) {
    array.push(Math.random());
  }
  return array;
};