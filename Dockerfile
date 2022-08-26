# setup lightweight node with full necessary build tools native
FROM node:16 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install --force
COPY . .
RUN npm run build

# setup new lightweight node image to run
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
USER node
# CMD ["npm", "run", "start:prod"]