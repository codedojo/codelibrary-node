# CodeLibrary

Демо-проект для курса "Node.js в действии".
Приложение представляет из себя библиотеку книг.

## Основные маршруты

* `/` - главная страница
* Вход и регистрация
    * `/auth/register` - регистрация
    * `/auth/login` - вход
* Профиль пользователя
    * `/user` - страница пользователя
    * `/user/edit` - редактирование пользователя
* Книги
    * `/books` - книгами
    * `/books/new` - новые книги
    * `/books/best` - лучшие книги
    * `/books/search` - поиск
    * `/books/:topic` - книги по теме
    * `/books/:book` - книга
* Администратор
    * `/admin` - главная страница
    * `/admin/login` - вход
    * Книги
        * `/admin/books` - список книг
        * `/admin/books/create` - создание книги
        * `/admin/books/:book/update` - редактирование книги
        * `/admin/books/:book/delete` - удаление книги
    * Темы
        * `/admin/topics` - список тем
        * `/admin/topics/create` - создание темы
        * `/admin/topics/:book/update` - редактирование темы
        * `/admin/topics/:book/delete` - удаление темы
    * Пользователи
        * `/admin/users` - список пользователей
        * `/admin/users/:user` - пользователь