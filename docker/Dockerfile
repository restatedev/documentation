FROM node:lts as builder

# Reduce npm log spam and colour during install within Docker
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false

WORKDIR /restate-documentation
# Copy the source code over
COPY . .
# Install (not ci) with dependencies, and for Linux vs. Linux Musl (which we use for -alpine)
RUN npm install
# Build the Restate documentation
RUN npm run build

# Use a stable nginx image for serving the documentation
FROM nginx:stable-alpine as deploy
WORKDIR /restate-documentation
# Copy what we've built from production
COPY --from=builder /restate-documentation/build /usr/share/nginx/html/
