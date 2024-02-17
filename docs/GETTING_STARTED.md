## Getting started

Make sure you have at least Node.js v19 (19.9.0 recommended) installed.

You can check your Node.js version by running node -v:

```console
$ node -v
v19.9.0
```

#### `clone`

Navigate to your work directory and clone the project into bookStoreAPI folder, change directory to the `bookStoreAPI folder` and add a new remote origin pointing to the new project repo.

```console
$ git clone https://github.com/AugustineUmeagudosi/bookStoreAPI.git
$ cd bookStoreAPI
~/bookStoreAPI $ git remote add origin https://github.com/AugustineUmeagudosi/bookStoreAPI.git
```

#### `setup`

Follow these steps to setup and start the app

1. create a `.env` file in the projects root directory
2. update the `.env` file you created with the contents in the `./.env.example` file and supply the values of the variables.
3. run `npm install` to install all the app's dependencies
4. start the app by running `npm start` command this will start the app on port 3000.
5. confirm that the app is running by making a GET request to `localhost:3000/api/v1/health-check/ping`
6. the API documentation can be found at https://documenter.getpostman.com/view/27254452/2sA2r7zP33
7. NB: the value of the `baseUrl` variable is `localhost:3000/api/v1`


#### `gulp`

Install [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) and navigate to new project directory, then run `sudo npm install` to install Node packages.

```console
$ sudo npm install -g gulp
~/bookStoreAPI $ sudo npm install
```

Run `gulp` to start project server:

```console
~/bookStoreAPI $ gulp serve
```

(Or, `gulp help` to see more task options)

```console
~/bookStoreAPI $ gulp help

  Main Tasks
  ----------------------
      babel
      clean
      copy
      default
      help
      nodemon
      serve
      test
```

#### `docker`

Install [Docker](https://www.docker.com/products/docker#/mac) and configure Dockerfile in the project.

**Dockerfile**

You could reconfigure the `Dockerfile` if need be. But the base configuration has been added and should work fine when building your image.

The following example shows a Dockerfile

```
FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/bookStoreAPI
WORKDIR /usr/src/bookStoreAPI

# Install app dependencies
COPY package.json /usr/src/bookStoreAPI/
RUN npm install

# Bundle app source
COPY . /usr/src/bookStoreAPI

EXPOSE 8080
CMD [ "npm", "start" ]
```

**.dockerignore**

A `dockerignore` file should be in the same directory as your `Dockerfile`, as it prevents files or folders from being copied onto your Docker image.

**Building your image**

Change directory to where your `Dockerfile` exists and run the following command. The `-t` flag lets you tag your image.

```console
$ docker build -t <your username>/bookStoreAPI .
```

Run `docker images ` to show your built image:

```console
$ docker images

REPOSITORY                              TAG                 IMAGE ID            CREATED             SIZE
nginx                                   latest              01f818af747d        6 days ago          181.6 MB
node                                    boron               539c0211cd76        3 weeks ago         80.0 MB
<your username>/bookStoreAPI         latest              c54a2cc56cbb        6 months ago        1.848 kB
```

**Run your image**

Run the image with `-d` in detached mode, leaving the container running in the background. The `-p` flag redirects a public port to a private port inside the container.

```console
$ docker run -p 8080:8080 -d <your username>/bookStoreAPI
```

Run `docker ps` to get container information:

```console
CONTAINER ID        IMAGE                                CREATED             STATUS              PORTS
6a0f008a639c        <your username>/bookStoreAPI     9 minutes ago       Up 2 minutes        0.0.0.0:8080->8080/tcp, 443/tcp
```

Docker is now mapped to `localhost:8080` inside of the container to port 8080 on your machine.

Using `curl`

```console
$ curl -i -X GET localhost:8080/v1/healthcheck/ping

HTTP/1.1 200 OK
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, PATCH, DELETE
Access-Control-Allow-Headers: Authorization, Origin, Content-Type, Accept
Access-Control-Allow-Credentials: true
Content-Type: application/json; charset=utf-8
Content-Length: 25
ETag: W/"19-6jwj4rMp1F49cKKCNHygJQ"
Date: Wed, 04 Jan 2017 10:09:53 GMT
Connection: keep-alive

{ "message": "PONG" }
```

visit [Docker webapp docs](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/) for further assistance.
