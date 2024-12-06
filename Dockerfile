# Use the official Node.js image as the base image
# You can use a specific version of Node.js (e.g., `node:18`)
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Use the official Nginx image for serving the static files
FROM nginx:alpine

# Copy the build output to the Nginx HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx will run on
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
