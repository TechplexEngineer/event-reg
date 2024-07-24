import Dexie, { type EntityTable } from 'dexie';

interface Event {
    id: number;
    startTime?: number,
    endTime?: number,
    name: string;

}

const db = new Dexie('EventsDatabase') as Dexie & {
    events: EntityTable<
        Event,
        'id' // primary key "id" (for the typings only)
    >;
};

// Schema declaration:
// NOTE: Don’t declare all columns like in SQL.
// You only declare properties you want to index, that is properties you want to use in a where(…) query.
db.version(1).stores({
    events: '++id, startTime, endTime, name' // primary key "id" (for the runtime!)
});

export type { Event };
export { db };