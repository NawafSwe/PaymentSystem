FROM node:15
# Create app directory
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=8081
EXPOSE 8081
CMD [ "npm", "start" ]
