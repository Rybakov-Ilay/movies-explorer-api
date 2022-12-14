// значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
const { DEFAULT_ALLOWED_METHODS } = require('../utils/constants');
// домены, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://movies.ilya.nomoredomains.icu',
  'https://movies.ilya.nomoredomains.icu',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://api.movies.ilya.nomoredomains.icu',
  'https://api.movies.ilya.nomoredomains.icu'
];

module.exports = (req, res, next) => {
  // сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
    // запрос на получение данных авторизации с другого домена
    res.header('Access-Control-Allow-Credentials', true);
  }

  // сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const { method } = req;
  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];

  // если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с заголовками исходного запроса
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // запрос на получение данных авторизации с другого домена
    res.header('Access-Control-Allow-Credentials', true);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  return next();
};
