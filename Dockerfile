FROM node:20-alpine AS base

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

FROM base AS development
ENV NODE_ENV=development
EXPOSE 8080
CMD ["pnpm", "dev", "--host", "0.0.0.0"]

FROM base AS build
ENV NODE_ENV=production
RUN pnpm build

FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

