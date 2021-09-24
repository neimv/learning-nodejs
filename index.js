/**
 * @class       : index
 * @author      : neimv (neimv@dark-world)
 * @created     : jueves sep 23, 2021 17:18:53 CDT
 * @description : index
 */

const express = require('express');
const app = express();

// body parser
app.use(express.json());

const config = require('./config/index')
const  moviesApi = require('./routes/movies.js')

moviesApi(app);

app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
})

