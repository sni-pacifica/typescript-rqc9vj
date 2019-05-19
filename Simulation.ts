import { Datagen } from "./model";
import { Filtering } from "./model";
import { Predicates } from "./model";
import { execTime } from "./Perfs";
import { Logger } from "./Logger";

export class Metrics {

  constructor(readonly values: Array<number> = []) {
    this.mean = values.reduce((memo, next) => memo + next, 0) / values.length;
  }

  addValue = (x: number) => new Metrics(this.values.concat(x));

  private mean: number;
  meanValue = () => {
    return (this.mean)
      ? this.mean
      : this.mean = 5
  }

}

type ExecutionTimes = Map<string, Metrics>;

export class Simulation {

  constructor(readonly howMuchClientsToCreate: number) { }

  run = (times: number = 1) => {

    // totally arbitrary !
    const warmupIteration = 3;
    const executionTimes: ExecutionTimes = new Map();

    for (let i = 0; i <= warmupIteration + times; i++) {

      const [clients, creationTimeInMS] = execTime(() =>
        Datagen.randomClients(this.howMuchClientsToCreate)
      );

      if (i > warmupIteration) {
        this.appendValueToExecutionTimeForKey(executionTimes, "creationTimeInMS", creationTimeInMS);
      }


      const [filteredClients, filterOnePassTime] = execTime(() =>
        Filtering.filterOnePass(
          clients,
          [
            Predicates.nameContains("ef"),
            Predicates.isAdult,
            Predicates.isMale
          ]
        )
      );
      if (i > warmupIteration) {
        this.appendValueToExecutionTimeForKey(executionTimes, "filterOnePassTime", filterOnePassTime);
      }

      const [filteredClientsMulti, filterMultiplePass] = execTime(() =>
        Filtering.filterMultiplePass(
          clients,
          [
            Predicates.nameContains("ef"),
            Predicates.isAdult,
            Predicates.isMale
          ]
        )
      );

      if (i > warmupIteration) {
        this.appendValueToExecutionTimeForKey(executionTimes, "filterMultiplePass", filterMultiplePass);
      }

    }

    return executionTimes;

  }

  private appendValueToExecutionTimeForKey(m: ExecutionTimes, key: string, value: number) {
    m.set(key,
      (m.get(key) || new Metrics([])).addValue(value)
    )
  }

}
