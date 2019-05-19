
import { Logger } from "./Logger";
import { Simulation } from "./Simulation";

const simulation = new Simulation(100);
const times = simulation.run();
Logger.dumpJson(times);
