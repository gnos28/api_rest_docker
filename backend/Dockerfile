FROM node:18 as base

RUN apt update
RUN apt install sqlite3
WORKDIR /src
COPY package*.json /
EXPOSE 5000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["node", "src/index.js"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /
CMD ["nodemon", "src/index.js"]
