module.exports.DATABASE_URL = 'mongodb://localhost:27017/moviesdb';
module.exports.JWT_DEV_SECRET = 'dev-secret';

module.exports.REG_EXP_LINK = /^https?:\/\/(www.)?[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+)*#*$/;

module.exports.BAD_REQUEST_MESSAGE = 'Переданы некорректные данные';
module.exports.FORBIDDEN_MESSAGE = 'Вы не подписаны на это действие';
module.exports.NOT_FOUND_MESSAGE = 'По указанному _id ничего не найдено';
module.exports.INCORRECT_EMAIL_OR_PASS = 'Некорректный пароль или почта';
module.exports.CONFLICT_MESSAGE = 'Пользователь с таким email уже существует';
module.exports.UNAUTHORIZED_MESSAGE = 'Необходима авторизация';
module.exports.INTERNAL_ERROR_MESSAGE = 'Внутренняя ошибка сервера';
module.exports.PAGE_NOT_FOUND = 'Страница не найдена';
module.exports.EXIT = 'Вы вышли';
module.exports.DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
module.exports.INCORRECT_EMAIL = 'Введите корректный адрес почты';
module.exports.SERVER_CRASHED = 'Сервер сейчас упадёт';
module.exports.SERVER_ERROR = 'Ошибка сервера';
