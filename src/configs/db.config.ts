/**
 * @module src/configs/db.config.ts
 * @requires Mongoose
 * @description this module is related to database configuration and connection
 */

import Mongoose from 'mongoose';

/**
 * @async
 * @function
 * @namespace connect
 * @param uri uri of the database
 * @description establish connection to database
 * @return Promise<void|never> void function
 * @throws error if there is any problem occurred
 *
 */
export async function connect(uri: string): Promise<void | never> {
    try {
        await Mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log(`successfully connected to db`);
    } catch (error: any) {
        console.log(`error occurred when connecting to database error: ${error.message}`);
    }
}
