FROM node:alpine

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

#Set environment variables
ENV PORT=3000

# Build time commands
# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json .
RUN npm install

RUN npm install -g nodemon

# Bundle app source
COPY . .

# Default runtime commands when a container first runs
CMD ["npm", "run", "dev"]