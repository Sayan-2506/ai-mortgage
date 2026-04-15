# Используем легкий образ Node.js
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект (включая твою папку app и остальные файлы)
COPY . .

# Собираем проект для продакшена
RUN npm run build

# Финальный образ для запуска
FROM node:20-alpine

WORKDIR /app

# Копируем только результат сборки из предыдущего этапа
COPY --from=builder /app/.output ./.output

# Nuxt 4 по умолчанию слушает 3000 порт
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

# Запуск скомпилированного сервера
CMD ["node", ".output/server/index.mjs"]