import { customType, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import type { InferInsertModel, InferModel, InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';


interface EventData {

    name: string, //'New England Robotics Derby',
    date: Date, //'October 12, 2024',
    location: {
        address1: string, //Billerica Memorial High School
        address2: string, //32 River Street
        city: string,     //Billerica
        state: string,    //MA
    },

    // slug cannot be "new" because we use that as the route for a new event
    eventSlug: string, //'nerd24', // often the same as eventCode but can be entered before the eventCode is assgined
    program: string, //'FRC',
    message: string,
    //         `Hello Teams!    
    // We are looking forward to hosting the 3rd annual NERD!    
    // Be sure to pay by the deadline as we have teams on the waitlist!`,
    contactEmail: string, //'blake@team4909.org',
    eventWebsite: string, //'https://www.newenglandroboticsderby.com/',
    teamLimit: number, //32

    // onshape: {
    //     access: {
    //         read?: {
    //             // onshape team ids that can release parts in this project
    //             teamId: string,
    //         }[],
    //         write?: {
    //             // onshape team ids that can add documents to the project
    //             teamId: string,
    //         }[]
    //     }
    //     docIds: string[],
    //     // mainAssembly: { did: string, eid: string },
    //     projectOwnerId: string // onshape user that has access to project
    // },
    // trello: {
    //     boardId: string,
    //     listId: string,
    //     token: Oauth1AccessToken,
    // }
}

// A project relates onshape documents with a trello board and access permissions
export const eventTable = sqliteTable('projects', {
    id: integer('id').primaryKey(),
    name: text('slug').notNull().unique(),
    data: text('data', { mode: 'json' }).notNull().$type<EventData>(), //json data
});
export type EventResultModel = InferSelectModel<typeof eventTable>;
export type EventInsertModel = InferInsertModel<typeof eventTable>;

export const eventInsertSchema = createInsertSchema(eventTable);
export const eventSelectSchema = createSelectSchema(eventTable);

console.log(JSON.stringify(eventInsertSchema, null, 2))


