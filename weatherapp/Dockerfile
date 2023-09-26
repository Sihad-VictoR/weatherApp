# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React application
RUN npm run build

# Specify the port your app will run on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
