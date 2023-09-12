FROM node:16.14.0-alpine AS frontend-builder
WORKDIR /usr/app
COPY frontend ./frontend
RUN npm --prefix frontend install
RUN npm --prefix frontend run build

FROM node:16.14.0-alpine AS backend-builder
WORKDIR /usr/app
COPY backend ./backend
RUN npm --prefix backend install
RUN npm --prefix backend run build

FROM node:16.14.0-alpine AS runtime-environment
WORKDIR /usr/app
COPY --from=backend-builder /usr/app/backend/package.json ./package.json
COPY --from=backend-builder /usr/app/backend/node_modules ./node_modules
COPY --from=backend-builder /usr/app/backend/dist ./dist
CMD [ "npm", "start" ]
