import { IncompatibleDimensionsError } from "../src/exceptions/incompatible-dimensions-error";
import { Particle } from "../src/particle";
import { describe, expect, test, it } from "bun:test";

const fitnessFunction = (args: number[]) =>
  args.reduce((acc, cur) => acc - Math.abs(cur)) + 3;
const numberOfDimensions = 2;

describe("Particle -> Unit Tests", () => {
  const particle = new Particle(numberOfDimensions, fitnessFunction);

  describe("Instance creation defaults", () => {
    it("When passing only required args, expect to use random array with N dimensions for velocity, position and personalBest", () => {
      expect(particle.velocity.length).toBe(numberOfDimensions);
      expect(particle.position.length).toBe(numberOfDimensions);
      expect(particle.personalBestPosition.length).toBe(numberOfDimensions);
    });

    it("Should set personalBestPosition as position by default", () => {
      expect(particle.personalBestPosition).toEqual(particle.position);
    });
  });

  describe("Invalid velocity update attempts", () => {
    it("Should throw exception when attempt to update velocity using gbest array with missing dimensions", () => {
      const invalidUpdateAttempt = () => particle.updateVelocity([1]);
      expect(invalidUpdateAttempt).toThrowError(
        new IncompatibleDimensionsError(),
      );
    });

    it("Should throw exception when attempt to update velocity using gbest array with extra dimensions", () => {
      const invalidUpdateAttempt = () => particle.updateVelocity([1, 2, 3]);
      expect(invalidUpdateAttempt).toThrowError(
        new IncompatibleDimensionsError(),
      );
    });

    describe("Personal Best at position update3", () => {
      it("When new position fitness is better than personal best, expect to update value", () => {
        const initialPosition = [1, 2];
        const velocity = [-1, -2];

        const testParticle = new Particle(
          numberOfDimensions,
          fitnessFunction,
          velocity,
          initialPosition,
        );

        const previousBestFitness = testParticle.personalBestFitness;

        testParticle.updatePosition();

        expect(testParticle.personalBestPosition).toEqual([0, 0]);
        expect(previousBestFitness).toBeLessThan(
          testParticle.personalBestFitness,
        );
      });
      
      it("When new position fitness is worse than personal best, expect to update value", () => {
        const initialPosition = [0, 0];
        const velocity = [1, 1];

        const testParticle = new Particle(
          numberOfDimensions,
          fitnessFunction,
          velocity,
          initialPosition,
        );

        const previousBestFitness = testParticle.personalBestFitness;

        testParticle.updatePosition();

        expect(testParticle.personalBestPosition).toEqual([0, 0]);
        expect(previousBestFitness).toEqual(
          testParticle.personalBestFitness,
        );
      });
    });
  });
});
