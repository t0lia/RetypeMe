#dockerfile for hardhat node
FROM node:21.5.0-alpine AS build

# Create app directory
WORKDIR /app
COPY . /app/

# Build the Next.js application
RUN npm install

# Stage 2: Production Stage
FROM node:21.5.0-alpine AS production
WORKDIR /app

COPY --from=build /app .

EXPOSE 8545


#npx hardhat node
CMD ["npx", "hardhat", "node"]
