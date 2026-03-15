# Stage 1: Build
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json .npmrc ./
RUN npm ci --ignore-scripts

# Copy source and build
COPY . .

# Resolve public/docs symlink for the build context
RUN rm -f public/docs && cp -r docs public/docs

RUN npm run build

# Stage 2: Production
FROM nginx:1.27-alpine AS production

# Apply security patches and remove default config
RUN apk upgrade --no-cache && \
    rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Create non-root user and fix permissions
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup && \
    chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    touch /tmp/nginx.pid && \
    chown appuser:appgroup /tmp/nginx.pid

USER 1001

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
