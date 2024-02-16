FROM node:carbon

# Create app directory
RUN mkdir -p /usr/src/bookStore-backend
WORKDIR /usr/src/bookStore-backend

# Install app dependencies
COPY package.json /usr/src/bookStore-backend/
RUN npm install

# Bundle app source
COPY . /usr/src/bookStore-backend

EXPOSE 8080
CMD [ "npm", "start" ]
