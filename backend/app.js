require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001, DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const { limiterConfig } = require('./utils/config');

const app = express();

const router = require('./routes');
const centralizedErrorHandler = require('./middlewares/centralizedErrorHandler');

app.use(helmet());
const limiter = rateLimit(limiterConfig);

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter);

app.use(express.json());

mongoose.connect(DB_ADDRESS);

app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
