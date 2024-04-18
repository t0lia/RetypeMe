# Stage 1: Build Stage
FROM node:21.4.0-alpine AS build

ARG NEXT_PUBLIC_ENV_LOCAL_INFURA_AMOY_API_KEY
ENV NEXT_PUBLIC_ENV_LOCAL_INFURA_AMOY_API_KEY ${NEXT_PUBLIC_ENV_LOCAL_INFURA_AMOY_API_KEY}

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production Stage
FROM node:21.4.0-alpine AS production
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .

# Expose the port that your Next.js app is running on
EXPOSE 3000

# Start the Next.js application in production mode
CMD ["npm", "start"]
