/**
 * @class       : index
 * @author      : neimv (neimv@dark-world)
 * @created     : jueves sep 23, 2021 17:17:25 CDT
 * @description : index
 */

require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000
}

module.exports = config

