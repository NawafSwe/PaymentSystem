# Use Node.js version 15 as the base image
FROM node:15

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
# This layer will be rebuilt only if package files change
COPY package*.json ./

# Install dependencies using clean install and clear npm cache
# Using ci instead of install for more reliable builds
RUN npm ci && npm cache clean --force

# Copy the rest of the application code
# This includes all source files, configs, and assets
COPY . .

# Compile TypeScript to JavaScript
# This creates the dist directory with compiled code
RUN npm run build

# Set environment variable for the application port
ENV PORT=3000

# Document the port that will be exposed by the container
EXPOSE ${PORT}

# Start the application using the compiled JavaScript
CMD [ "node", "dist/index.js" ]
