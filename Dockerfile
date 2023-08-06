FROM node:18 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Set VITE_APP_API_URL variable
ARG VITE_APP_API_URL
ENV VITE_APP_API_URL ${VITE_APP_API_URL}

# Install app dependencies
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build


# Step 2: Serve the app on Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY public/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
