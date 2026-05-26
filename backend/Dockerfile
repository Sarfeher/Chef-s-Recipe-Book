FROM node:22.7.0-alpine3.20
WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN ["npm", "ci"]
COPY ./src ./src
EXPOSE 4000
ENTRYPOINT ["npm", "start"]
