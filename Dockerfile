FROM node:22-bookworm-slim AS build
WORKDIR /app

ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID
ENV NEXT_PUBLIC_UMAMI_WEBSITE_ID=$NEXT_PUBLIC_UMAMI_WEBSITE_ID

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build \
    && npx playwright install --with-deps chromium \
    && npm run pdf \
    && npm run pdf:check

FROM nginxinc/nginx-unprivileged:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out/ /usr/share/nginx/html/
