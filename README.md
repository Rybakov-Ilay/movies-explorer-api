# Дипломный проект Movies. Backend. 

## API для аутентификации пользователей и сохранения фильмов.
К серверу можно обратиться по адресу:
https://api.movies.ilya.nomoredomains.icu

## Роуты сервера

- __/signup__ создаёт пользователя с переданными в теле
email, password и name 

- __/signin__ проверяет переданные в теле почту и пароль
и возвращает JWT
- __/signout__ деавторизирует и очищает куки с JWT-токеном

- __/users/me__ возвращает информацию о пользователе (email и имя)

- __/users/me__ обновляет информацию о пользователе (email и имя)

- __/movies__ возвращает все сохранённые текущим  пользователем фильмы

- __/movies__ создаёт фильм с переданными в теле
country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId

- __/movies/id__ удаляет сохранённый фильм по _id

## Технологии
- Express.js
- NGINX
- Git
- MongoDB
- REST API
