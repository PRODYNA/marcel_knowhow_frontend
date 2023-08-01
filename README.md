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
BACKEND_ENDPOINT=http://localhost:8000
docker buildx build \
   --build-arg VITE_APP_API_URL=$BACKEND_ENDPOINT \
   -t marcel_knowhow_frontend \
   .
```

## Continuous Integration and Devlivery with GitHub Actions
The project comes with a GitHub Actions workflow to build and push the image to the Azure Container Registry (see `./.github/workflows/frontend.yaml`).

To use push a new image to the Azure Container Registry set the three secrets in Github:
- REGISTRY_LOGIN_SERVER
- REGISTRY_USERNAME
- REGISTRY_PASSWORD

![ACR Secrets](docs/Github_actions_secrets.png)

## Image for Azure Container Registry and Azure Container Apps Service
Build the docker image with:
```bash
BACKEND_ENDPOINT=https://marcel-knowhow-backend.wonderfulbeach-9704a689.westus2.azurecontainerapps.io/
docker buildx build \
   --platform linux/amd64 \
   --build-arg VITE_APP_API_URL=$BACKEND_ENDPOINT \
   -t jnicontainerregistry.azurecr.io/marcel_knowhow_frontend \
   .
```

Use `docker push jnicontainerregistry.azurecr.io/marcel_knowhow_frontend:latest` to push the image to the Azure Container Registry.

# Azure Container Apps Service
- Set the Container app name to `marcel-knowhow-frontend`.
- Choose the latest backend image from the AZR.
- Select **0.25 vCPU, 0.5 GB RAM** for CPU and Memory.
- Enable Ingress
- Accept trafffic from anywhere
- Set the Target port to `80`
