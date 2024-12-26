import { Swarm } from "./swarm";

const dimensions = 2;
const size = 10;
const fitnessFunction = (args: number[]) =>
  -Math.abs(args[0]) - Math.abs(args[1]) + 3;

const swarm = new Swarm(dimensions, size, fitnessFunction);

swarm.optimize(500);

console.log(swarm.toString());
