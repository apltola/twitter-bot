FROM node:16.16.0

WORKDIR /app

COPY package.json .
COPY tsconfig.json .
COPY src ./src

RUN ls -a
RUN npm install
RUN npm run build

CMD [ "node", "./dist/index.js" ]
