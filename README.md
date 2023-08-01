```
 __  __                    _   _____                _                 _ 
|  \/  | __ _ _ __ ___ ___| | |  ___| __ ___  _ __ | |_ ___ _ __   __| |
| |\/| |/ _` | '__/ __/ _ \ | | |_ | '__/ _ \| '_ \| __/ _ \ '_ \ / _` |
| |  | | (_| | | | (_|  __/ | |  _|| | | (_) | | | | ||  __/ | | | (_| |
|_|  |_|\__,_|_|  \___\___|_| |_|  |_|  \___/|_| |_|\__\___|_| |_|\__,_|

```
Marcel Knowhow Frontend Project
===============================

This project holds the frontend for the Marcel Knowhow session.
It is a React Frontend with Material UI and can be exectuted with Vite.

# Local Development Setup


## Dependencies
- If you have not pnpm installed, please do so with `npm install -g pnpm`.
- Install all project dependencies with `pnpm install`.


## Local Vite Development Server

Provide a local `.env` file with the following content to set the local backend endpoint:
```
VITE_APP_API_URL=http://localhost:8080
```
This file is ignored by git.

Afterwards run the server with `pnpm run dev`.
Hit 'q' to stop the dev server.


# Docker image
## Local Docker Evnironment
Build the docker image for local docker compose environment with:
```bash
BACKEND_ENDPOINT=http://localhost:8080
docker buildx build \
   --build-arg VITE_APP_API_URL=$BACKEND_ENDPOINT \
   -t marcel_knowhow_frontend \
   .
```

## Image for Azure Container Registry and Azure Container Apps Service
Build the docker image with:
```bash
BACKEND_ENDPOINT=https://marcel-knowhow-backend3.mangowater-dae365c4.westus2.azurecontainerapps.io
docker buildx build \
   --platform linux/amd64 \
   --build-arg VITE_APP_API_URL=$BACKEND_ENDPOINT \
   -t jnicontainerregistry.azurecr.io/marcel_knowhow_frontend \
   .
```

Use `docker push jnicontainerregistry.azurecr.io/marcel_knowhow_frontend:latest` to push the image to the Azure Container Registry.

