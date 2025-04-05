FROM node:latest AS builder
WORKDIR /app
COPY frontend/package*.json frontend/
RUN cd frontend && npm install
COPY frontend/. frontend/.
RUN cd frontend && npm run build

FROM nginx:latest
EXPOSE 80

COPY --from=builder /app/frontend/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf