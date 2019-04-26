ARG NODE_VERSION=8.16.0

# ---- Base Node ----
FROM node:${NODE_VERSION}-jessie AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install --only=production

# --- Release with Alpine ----
FROM node:${NODE_VERSION}-alpine AS release
EXPOSE 3173
WORKDIR /app
COPY --from=dependencies /app ./
COPY index.js swagger.json ./
COPY src ./src/
RUN chown node:node -R /app
USER node
CMD ["node", "-r", "esm", "-r", "dotenv/config", "index.js"]
