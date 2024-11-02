FROM node:18

ENV DB_USER=admin
ENV DB_PWD=1qaz
ENV DB_HOST=postgres
ENV DB_PORT=5432
ENV DB_NAME=fiap_fast_food
ENV DB_DIALECT=postgres
ENV DATABASE_URL=postgres://admin:1qaz@postgres:5432/fiap_fast_food

WORKDIR /app

COPY package.json ./
RUN npm install

COPY tsconfig.json ./
COPY db ./db
COPY src ./

CMD ["npm", "run", "bomba-patch-100-atualizado"]