# Use the official Node.js image as a base
FROM node:16

# Create and change to the app directory
WORKDIR /Product

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY product.js ./
Copy Product_sch.js ./

# Expose the port that your service will run on
EXPOSE 5002

# Define the command to run the app
CMD ["node", "product.js"]
