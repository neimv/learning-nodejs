/**
 * @class       : index
 * @author      : neimv (neimv@dark-world)
 * @created     : jueves sep 23, 2021 17:17:25 CDT
 * @description : index
 */

require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT
}

module.exports = config

