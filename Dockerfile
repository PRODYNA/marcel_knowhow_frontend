# Step 1: Build the app in a node.js environment
FROM node:18 as build

# Set working directory
WORKDIR /app

# Add `node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Set VITE_APP_API_URL variable
ARG VITE_APP_API_URL
ENV VITE_APP_API_URL ${VITE_APP_API_URL}

# Install app dependencies
COPY package*.json ./
RUN npm install
COPY . .

# Create a production build
RUN npm run build

# Step 2: Serve the app on Nginx
FROM nginx:stable-alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
