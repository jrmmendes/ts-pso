export class IncompatibleDimensionsError extends Error {
  constructor() {
    super('The provided velocity array has invalid number of dimensions');
  }
}