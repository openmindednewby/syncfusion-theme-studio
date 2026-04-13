# Stage 1: Build the Vite React app
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY scripts/patch-minimatch.cjs scripts/patch-minimatch.cjs
RUN npm install --legacy-peer-deps --no-audit --no-fund

COPY . .

ARG VITE_BACKEND_URL=/mockapi
ARG VITE_SYNCFUSION_LICENSE_KEY=
ARG VITE_ENABLE_THEME_STUDIO=true
ARG VITE_ENABLE_COMPONENTS=true
ARG VITE_ENABLE_FORMS=true
ARG VITE_ENABLE_PRODUCTS=true

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_SYNCFUSION_LICENSE_KEY=$VITE_SYNCFUSION_LICENSE_KEY
ENV VITE_ENABLE_THEME_STUDIO=$VITE_ENABLE_THEME_STUDIO
ENV VITE_ENABLE_COMPONENTS=$VITE_ENABLE_COMPONENTS
ENV VITE_ENABLE_FORMS=$VITE_ENABLE_FORMS
ENV VITE_ENABLE_PRODUCTS=$VITE_ENABLE_PRODUCTS

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.site.conf.template /etc/nginx/templates/default.conf.template

# Upstream for /mockapi proxy. Overridden per-env:
#   docker-compose: mock-server:8080
#   K8s (dloizides namespace): syncfusion-theme-studio-mock-api:8080
ENV MOCK_UPSTREAM=mock-server:8080

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
