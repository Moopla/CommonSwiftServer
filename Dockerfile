FROM node:alpine

#CREATE A USER!!!   
RUN addgroup app && adduser -S -G app app
USER app

# Build time commands
# Create app directory
RUN mkdir -p /app
WORKDIR /app

RUN apk update &&\
    apk upgrade &&\
    apk add --update alpine-sdk linux-headers git zlib-dev openssl-dev gperf php cmake &&\
    git clone https://github.com/tdlib/td.git &&\
    cd td &&\
    rm -rf build &&\
    mkdir build &&\
    cd build &&\
    cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX:PATH=../tdlib .. &&\
    cmake --build . --target install &&\
    cd .. &&\
    cd .. &&\
    ls -l td/tdlib

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

#Set environment variables
ENV PORT=3000


# Install app dependencies
COPY package.json .
RUN npm install

RUN npm install -g nodemon

RUN npm install -g node-gyp

RUN npm install airgram

# Bundle app source
COPY . .

# Default runtime commands when a container first runs
CMD ["npm", "run", "dev"]