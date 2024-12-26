import type { FitnessFunction } from "./fitness-function";
import { Particle } from "./particle";

export class Swarm {
  private globalBest: Particle;
  private epoch = 0;
  private particles: Array<Particle> = [];

  constructor(
    private readonly numberOfDimensions: number,
    size: number,
    fitnessFunction: FitnessFunction,
  ) {
    this.numberOfDimensions = numberOfDimensions;

    for (let i = 0; i < size; i++) {
      this.particles.push(new Particle(numberOfDimensions, fitnessFunction));
    }
    this.particles.sort((a, b) => b.fitness - a.fitness);
    this.globalBest = this.particles[0].clone;
  }

  private updateGlobalBest() {
    this.particles.sort((a, b) => b.fitness - a.fitness);
    this.globalBest = this.particles[0].clone;
  }

  optimize(epochs: number) {
    for (let i = 0; i < epochs; i++) {
      this.particles.forEach((particle) => {
        particle.updateVelocity(this.globalBest.position);
        particle.updatePosition();
      });
      this.updateGlobalBest();
      console.log(
        `best: f(${this.globalBest.position}) = ${this.globalBest.fitness} `,
      );
      this.epoch += 1;
    }
  }

  toString() {
    const precision = 6;
    return (
      `\n ==== RESULTS ====\n` +
      `epoch: ${this.epoch} | best: ${JSON.stringify({
        position: this.globalBest.position.map((n) => n.toFixed(precision)),
        fitness: this.globalBest.fitness.toFixed(precision),
      }, null, 2)}`
    );
  }
}
