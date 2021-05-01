const dotenv = require('dotenv');
const dotenvCustom = require('custom-env');

export function envConfig() {
    if (process.env['NODE_ENV'] === 'production') {
        dotenvCustom.env(process.env['NODE_ENV']);
    } else {
        dotenv.config();
    }
    console.log(`server running on ${process.env['NODE_ENV']} mode`);
}
