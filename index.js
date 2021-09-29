/**
 * @class       : index
 * @author      : neimv (neimv@dark-world)
 * @created     : jueves sep 23, 2021 17:18:53 CDT
 * @description : index
 */

const express = require('express');
const app = express();

const config = require('./config/index')
const  moviesApi = require('./routes/movies.js')

const { logError, errorHandler, wrapError } = require('./utils/middleware/errorHandlers');
const notFuntionHandler = require('./utils/middleware/notFoundHandler');

// body parser
app.use(express.json());

// Routes
moviesApi(app);

// catch 404
app.use(notFuntionHandler);

// Errors middleware
app.use(logError);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
})

