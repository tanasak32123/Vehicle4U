FROM node:14-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_HOST=18.139.0.50
ENV DATABASE_PORT=5432
ENV DATABASE_USERNAME=postgres
ENV DATABASE_PASSWORD=mypassword
ENV DATABASE_NAME=vehicle4you


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $PORT

CMD ["npm", "run", "start:prod"]
