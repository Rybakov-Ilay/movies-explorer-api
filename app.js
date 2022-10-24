require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const routes = require('./routes/index');
const defaultErrorHandler = require('./erorrs/DefaultErorr');
const { DATABASE_URL } = require('./utils/constants');

const { PORT = 3000, DATABASE_PROD_URL, NODE_ENV } = process.env;

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(defaultErrorHandler);

async function main() {
  await mongoose.connect(NODE_ENV === 'production' ? DATABASE_PROD_URL : DATABASE_URL);
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

main();
