import { IncompatibleDimensionsError } from "../src/exceptions/incompatible-dimensions-error";
import { Particle } from "../src/particle";
import { describe, expect, test, it } from "bun:test";

const linearFunction = (args: number[]) => args.reduce((acc, cur) => acc + cur);

describe("Particle -> Unit Tests", () => {
  const N = 2;
  const particle = new Particle(N, linearFunction);

  describe("Instance creation defaults", () => {
    it("When passing only required args, expect to use random array with N dimensions for velocity, position and personalBest", () => {
      expect(particle.velocity.length).toBe(N);
      expect(particle.position.length).toBe(N);
      expect(particle.personalBestPosition.length).toBe(N);
    });

    it("Should set personalBestPosition as position by default", () => {
      expect(particle.personalBestPosition).toEqual(particle.position);
    });
  });

  describe("Invalid velocity update attempts", () => {
    it("Should throw exception when attempt to update velocity using gbest array with missing dimensions", () => {
      const invalidUpdateAttempt = () => (particle.updateVelocity([1]));
      expect(invalidUpdateAttempt).toThrowError(
        new IncompatibleDimensionsError(),
      );
    });

    it("Should throw exception when attempt to update velocity using gbest array with extra dimensions", () => {
      const invalidUpdateAttempt = () => (particle.updateVelocity([1, 2, 3]));
      expect(invalidUpdateAttempt).toThrowError(
        new IncompatibleDimensionsError(),
      );
    });
  });
});
