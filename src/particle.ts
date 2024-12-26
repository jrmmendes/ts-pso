import type { FitnessFunction } from "./fitness-function";
import { IncompatibleDimensionsError } from "./exceptions/incompatible-dimensions-error";
import { generateRandomArray } from "./utils";

export class Particle {
  public velocity: Array<number>;
  public position: Array<number>;
  public personalBestPosition: Array<number>;

  constructor(
    public readonly numberOfDimensions: number,
    public readonly fitnessFunction: FitnessFunction,
    velocity?: Array<number>,
    position?: Array<number>,
    personalBestPosition?: Array<number>,
  ) {
    this.numberOfDimensions = numberOfDimensions;

    if (
      [velocity, position, personalBestPosition]
        .filter((item) => item !== undefined)
        .some((item) => item.length !== this.numberOfDimensions)
    ) {
      throw new IncompatibleDimensionsError();
    }

    this.velocity = velocity ?? generateRandomArray(this.numberOfDimensions);
    this.position = position ?? generateRandomArray(this.numberOfDimensions);
    this.personalBestPosition = personalBestPosition ?? this.position;
  }

  get fitness() {
    return this.fitnessFunction(this.position);
  }

  get personalBestFitness() {
    return this.fitnessFunction(this.personalBestPosition);
  }

  updateVelocity(globalBestPosition: Array<number>) {
    if (globalBestPosition.length !== this.velocity.length) {
      throw new IncompatibleDimensionsError();
    }
    this.velocity = this.velocity.map((value, dimension) => {
      return (
        value +
        2 *
          Math.random() *
          (this.personalBestPosition[dimension] - this.position[dimension]) +
        2 *
          Math.random() *
          (globalBestPosition[dimension] - this.position[dimension])
      );
    });

    if (this.personalBestFitness < this.fitness) {
      this.personalBestPosition = this.position;
    }
  }

  updatePosition() {
    this.position = this.position.map(
      (value, dimension) => (value += this.velocity[dimension]),
    );
  }

  get clone(): Particle {
    return new Particle(
      this.numberOfDimensions,
      this.fitnessFunction,
      this.velocity,
      this.position,
      this.personalBestPosition,
    );
  }
}
