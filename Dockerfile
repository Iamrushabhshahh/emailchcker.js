# # From node:lts-alpine3.19
# # FROM node:18-alpinedocker 
# FROM alpine:latest

# RUN apk update && apk add chromium && apk add nodejs npm

# # Verify Node.js and npm installation
# RUN node --version
# RUN npm --version


# WORKDIR /app

# COPY . .

# RUN npm install express puppeteer

# CMD ["node", "emailChecker.js"]
FROM node:lts-alpine

# Install necessary dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set environment variables
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/

WORKDIR /app

COPY . .

# Install dependencies
RUN npm install express puppeteer

CMD ["node", "emailChecker.js"]
