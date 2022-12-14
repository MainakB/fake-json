FROM node:16-alpine3.15

#Set workdir
WORKDIR /app

# Add /app/node_modules/.bin to $PATH
ENV PATH /app/node_modules/.bin:$PATH

#Copy package.json into the container at /app/client
COPY package*.json /app/

#install dependencies
# RUN npm ci --loglevel verbose
RUN apk add --update --no-cache --virtual .gyp \
    bash \
    python2 \
    make \
    g++ \
    && npm install \
    && apk del .gyp

#Copy the current directory content to /server
COPY . /app/

#Run the app when container launches
CMD ["npm","start"]