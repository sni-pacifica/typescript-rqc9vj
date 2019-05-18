import Chance from "chance";
const chance = new Chance();

class Client {
  constructor(
    readonly nom: string,
    readonly age: number
  ) { }
}

class Contrat {
  constructor(
    readonly numero: string,
    readonly client: Client
  ) { }
}

class Formule {
  constructor(
    readonly nom: string,
    readonly options: Array<OptionContrat>
  ) { }
}

class OptionContrat {
  constructor(
    readonly nom: string
  ) { }
}

export namespace Datagen {

  const range = (from: number, to: number) =>
    Array.from({ length: (to - from) + 1 }, (x, i) => i + from);

  const randomClient = (idx: number) => new Client(chance.name({ middle: true }), chance.age())

  export const randomClients = (howMuch: number) =>
    (howMuch < 1)
      ? []
      : range(1, howMuch).map(
        randomClient
      )

}

export namespace Predicates {

  export const nameContains = (token: string) => (client: Client) =>
    (!token || !client)
      ? false
      : client.nom.indexOf(token) !== -1;

}

export namespace Filtering {

  export const filterOnePass = <T>(ts: Array<T>, predicates: Array<(t: T) => boolean>) =>
    ts.filter(t => predicates.reduce((memo, p) => memo && p(t), true))

}