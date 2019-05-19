import { Datagen } from "./model";
import { Filtering } from "./model";
import { Predicates } from "./model";
import { execTime } from "./Perfs";
import { Logger } from "./Logger";

export class Simulation {

  constructor(readonly howMuchClientsToCreate: number) { }

  run = () => {
    const executionTimes: Map<string, number> = new Map();

    const [clients, creationTimeInMS] = execTime(() =>
      Datagen.randomClients(this.howMuchClientsToCreate)
    );

    executionTimes.set("creationTimeInMS", creationTimeInMS);

    const [filteredClients, filterOnePassTime] = execTime(() =>
      Filtering.filterOnePass(
        clients,
        [
          Predicates.nameContains("ef"),
          Predicates.isAdult
        ]
      )
    );

    executionTimes.set("filterOnePassTime", filterOnePassTime);
    return executionTimes;

  }

}
