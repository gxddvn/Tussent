# Tussent

Tussent is a project management service similar to Trello or Jira. It helps teams efficiently organize workflows, manage tasks, and track their progress.

## 📌 Key Features
- Project management: create and configure projects.
- Task board: a column-based system (To Do, Doing, Done) for task management.
- Team collaboration: invite team members to projects.
- Flexible task settings: set priorities, deadlines, and assign responsible members.
- Notifications and updates: track changes in real-time.

## 🚀 Installation and Launch
### 1. Clone the repository
```sh
git clone https://github.com/gxddvn/Tussent.git
cd Tussent
```

### 2. Install dependencies
#### Backend (NestJS + TypeORM + PostgreSQL)
```sh
cd backend
npm install
```

#### Frontend (React + TypeScript)
```sh
cd frontend
npm install
```

### 3. Set up environment variables
Create a `.env` file in the `backend` and `frontend` directories and add the necessary variables (e.g., database settings, API keys, etc.).

Example `.env` for backend:
```env
PORT=4444
DB_NAME=tussent
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=tussent_secret_key123
MAIL_TRANSPORT=smtps://youremail@gmail.com:yourpass@smtp.gmail.com
MAIL_FROM_NAME=youremail@gmail.com
```

### 4. Start the project
Start backend:
```sh
cd backend
npm run start
```

Start frontend:
```sh
cd frontend
npm run dev
```

## 🛠 Technologies
- **Backend**: NestJS, TypeORM, PostgreSQL, Redis and more...
- **Frontend**: React, TypeScript, Redux Toolkit, TailwindCSS and more...
- **Authentication**: JWT + Passport.js

---
✨ **Tussent** — simplify project management! 🚀

---

# Tussent (Українська)

Tussent — це сервіс для управління проектами, схожий на Trello або Jira. Він допомагає командам ефективно організовувати робочі процеси, керувати завданнями та відстежувати їх виконання.

## 📌 Основні можливості
- Управління проектами: створення та налаштування проектів.
- Дошка завдань: система колонок (To Do, Doing, Done) для управління завданнями.
- Спільна робота в команді: можливість додавання учасників до проектів.
- Гнучке налаштування завдань: визначення пріоритетів, термінів та відповідальних виконавців.
- Сповіщення та оновлення: відстеження змін у реальному часі.

## 🚀 Встановлення та запуск
### 1. Клонування репозиторію
```sh
git clone https://github.com/gxddvn/Tussent.git
cd Tussent
```

### 2. Встановлення залежностей
#### Backend (NestJS + TypeORM + PostgreSQL)
```sh
cd backend
npm install
```

#### Frontend (React + TypeScript)
```sh
cd frontend
npm install
```

### 3. Налаштування змінних оточення
Створіть файл `.env` у папках `backend` та `frontend` і додайте необхідні змінні (наприклад, налаштування бази даних, API-ключі тощо).

Приклад `.env` для backend:
```env
PORT=4444
DB_NAME=tussent
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=tussent_secret_key123
MAIL_TRANSPORT=smtps://youremail@gmail.com:yourpass@smtp.gmail.com
MAIL_FROM_NAME=youremail@gmail.com
```

### 4. Запуск проекту
Запуск backend:
```sh
cd backend
npm run start
```

Запуск frontend:
```sh
cd frontend
npm run dev
```

## 🛠 Технології
- **Backend**: NestJS, TypeORM, PostgreSQL, Redis та більше...
- **Frontend**: React, TypeScript, Redux Toolkit, TailwindCSS та більше...
- **Автентифікація**: JWT + Passport.js

---
✨ **Tussent** — спростіть управління проектами! 🚀

