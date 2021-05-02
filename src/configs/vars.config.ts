/**
 * @module src/configs/vars.config.ts
 * @description this module responsible for determine the runtime env to place proper vars configurations
 * @requires dotenv
 * @requires dotenvCustom
 */
/**
 * @namespace dotenv,dotenvCustom
 * @description node modules to custom env
 */
const dotenv = require('dotenv');
const dotenvCustom = require('custom-env');

/**
 * @function
 * @namespace envConfig
 * @returns void
 * @description choosing the configuration of variables
 */
export function envConfig() {
    if (process.env['NODE_ENV'] === 'production') {
        dotenvCustom.env(process.env['NODE_ENV']);
    } else {
        dotenv.config();
    }
    console.log(`server running on ${process.env['NODE_ENV']} mode`);
}
