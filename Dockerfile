# Docker file for building image for this gethiredhints project for next js and tailwind

# load the base image
FROM node:12.18.3

# set the working directory
WORKDIR /usr/src/app

# copy the package.json and package-lock.json files
COPY package*.json ./

# install the dependencies
RUN npm install

# copy the source code
COPY . .

# build the project
RUN npm run build

# expose the port
EXPOSE 3000

# start the project
CMD ["npm", "start"]

