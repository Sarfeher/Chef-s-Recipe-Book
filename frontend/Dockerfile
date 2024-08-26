FROM node:22.7.0-alpine3.20
WORKDIR /app
COPY ./src ./src
COPY ./public ./public
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN ["npm", "i"]
ENTRYPOINT ["npm", "start"]
EXPOSE 3000