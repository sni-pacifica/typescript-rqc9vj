
import { Logger } from "./Logger";
import { Simulation } from "./Simulation";

const simulation = new Simulation(1000);
const times = simulation.run(100);

// Logger.dumpJson(times);
times.forEach((v, k) => {
  Logger.log(k + " = " + v.mean);
});
