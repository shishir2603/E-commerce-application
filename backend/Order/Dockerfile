# Use the official Node.js image as a base
FROM node:16

# Create and change to the app directory
WORKDIR /Order

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY order.js ./
COPY Order_sch.js ./
COPY Cart.js ./

# Expose the port that your service will run on
EXPOSE 5003

# Define the command to run the app
CMD ["node", "order.js"]
