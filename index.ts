
import { Logger } from "./Logger";
import { Datagen } from "./model";
import { Filtering } from "./model";
import { Predicates } from "./model";
import { execTime } from "./Perfs";

Logger.log("Hello", "#ff8855");
Logger.log("World !");


const [clients, creationTimeInMS] = execTime(() =>
  Datagen.randomClients(100)
);

const filtered = Filtering.filterOnePass(
  clients,
  [Predicates.nameContains("Marc")]
)
Logger.log(filtered.length);
Logger.dumpJson(clients);


