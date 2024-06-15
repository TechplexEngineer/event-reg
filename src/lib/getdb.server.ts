import { D1Database } from "@miniflare/d1";

let getDevDb = async (dbName: keyof App.Platform["env"]): Promise<any> => {
    // throw new Error("Not in a dev env, but attempted to access dev db");
    console.log("ERROR: Not in a dev env, but attempted to access dev db")
};


if (import.meta.env.DEV) {
    const fs = await import("fs/promises");
    const { D1Database: D1D, D1DatabaseAPI } = await import("@miniflare/d1");
    const { createSQLiteDB } = await import("@miniflare/shared");

    let devDb: D1Database;

    getDevDb = async (dbName: keyof App.Platform["env"]): Promise<D1Database> => {
        if (!devDb) {
            const basePath = ".wrangler/state/d1";
            await fs.mkdir(basePath, { recursive: true });
            const sqlLite = await createSQLiteDB(
                `${basePath}/${dbName}.sqlite3`
            );
            devDb = new D1D(new D1DatabaseAPI(sqlLite));
        }
        return devDb;
    };
}

const getDbFromPlatform = async (dbName: keyof App.Platform["env"], platform: App.Platform | undefined): Promise<D1Database> => {
    let db;
    if (platform?.env && platform?.env[dbName]) {
        db = platform.env[dbName];
    } else {
        db = await getDevDb(dbName);
    }

    // Migrator causing cannot start a transaction within a transaction
    // Migrator requires node packages not available in workers env
    // if (import.meta.env.DEV) { //we can only apply migrations in dev
    //     const ddb = drizzle(db as any);
    //     await migrate(ddb, {migrationsFolder: "./src/lib/migrations"});
    //     return ddb;
    // }

    return db;
};

export const getdb = getDbFromPlatform;