require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const helmet = require('helmet');
const routes = require('./routes/index');
const defaultErrorHandler = require('./erorrs/DefaultErorr');

const { PORT = 3000, DATABASE_URL } = process.env;

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
  await mongoose.connect(DATABASE_URL);
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

main();
