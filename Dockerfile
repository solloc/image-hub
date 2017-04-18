FROM node:alpine

# prepare a user which runs everything locally! - required in child images!
#RUN adduser -h=/home/app --s /bin/false app

RUN addgroup app
RUN adduser -G app -s /bin/sh -D app

ENV HOME=/home/app
WORKDIR $HOME

ENV APP_NAME=image-hub

## before switching to user we need to set permission properly
## copy all files, except the ignored files from .dockerignore

COPY . $HOME/$APP_NAME/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/$APP_NAME

RUN npm install

#COPY ./dist/. $HOME/$APP_NAME/

CMD ["npm","start"]


#COPY . $HOME/$APP_NAME/
#RUN chown -R app:app $HOME/*
#
#USER app
#WORKDIR $HOME/$APP_NAME
#
#RUN npm install