FROM node:22.7.0-alpine3.20
WORKDIR /app
COPY ./src ./src
#.env must exist
COPY ./.env ./.env
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN ["npm", "i"]
ENTRYPOINT ["npm", "start"]