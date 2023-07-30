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

# Setup and Start
- If you have not pnpm installed, please do so with `npm install -g pnpm`.
- Install all project dependencies with `pnpm install`.
- Run the project with `pnpm run dev`.
- Hit 'q' to stop the dev server.

# Docker image
Run `docker buildx build --platform linux/amd64 -t jnicontainerregistry.azurecr.io/marcel_knowhhow_frontend .` in the local build directory.
Use `docker push jnicontainerregistry.azurecr.io/marcel_knowhhow_frontend:latest` to push the image to the registry.

