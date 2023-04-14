import Dexie, { Table } from "dexie";

export interface Items {
  id?: number;
  name: string;
  tel: string;
}

export class MySubClassedDexie extends Dexie {
  items!: Table<Items>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      items: "++id, name, tel"
    });
  }
}

export const db = new MySubClassedDexie();
