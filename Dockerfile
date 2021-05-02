FROM node:15
# Create app directory
WORKDIR /src
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=8081
EXPOSE 8081
CMD [ "npm", "start" ]
