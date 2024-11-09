FROM node:22.11.0-bookworm-slim
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

CMD npm run start