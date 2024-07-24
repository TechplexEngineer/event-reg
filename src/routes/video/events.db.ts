import Dexie, { type EntityTable } from 'dexie';

interface Event {
    id: number;
    type: string,
    time: number,
    name: string;

}

const db = new Dexie('EventsDatabase') as Dexie & {
    events: EntityTable<
        Event,
        'id' // primary key "id" (for the typings only)
    >;
};

// Schema declaration:
db.version(1).stores({
    events: '++id, type, time, name' // primary key "id" (for the runtime!)
});

export type { Event };
export { db };