![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![WebStorm](https://img.shields.io/badge/webstorm-143?style=for-the-badge&logo=webstorm&logoColor=white&color=black)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

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
