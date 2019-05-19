
import { Logger } from "./Logger";
import { Simulation } from "./Simulation";

const simulation = new Simulation(1000);
const times = simulation.run();
Logger.dumpJson(times);
