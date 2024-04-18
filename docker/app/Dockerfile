# Assuming your Dockerfile might look like this
FROM node:20.12.2

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the compiled JS files
COPY dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]