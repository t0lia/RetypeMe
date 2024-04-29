# RetypeMe - A platform to compete and show off how fast you can type on a keyboard

## Verified contract on Scroll Sepolia:

Contract address: [0x078869dd68d019900098b5b1006951ea7b3f01f2](https://sepolia.scrollscan.com/address/0x078869dd68d019900098b5b1006951ea7b3f01f2)

Contract verification: https://sepolia.scrollscan.com/address/0x078869dd68d019900098b5b1006951ea7b3f01f2#code

## Useful links

- Swagger UI: http://localhost:8080/api/swagger-ui/index.html#
- Metrics: http://localhost:8080/api/actuator/prometheus
- Health: http://localhost:8080/api/actuator/health
- Info: http://localhost:8080/api/actuator/info

## How to start the project locally

1. Install Docker and Docker Compose.
2. Use Docker Compose to start the project:

   - Start by rebuilding all images

     ```bash
     docker-compose up --build -d
     ```

   - Start without rebuilding all images

     ```bash
     docker-compose up -d
     ```

3. You can see current Docker containers by running:

   - All containers

     ```bash
     docker-compose ps
     ```

   - Containers logs
     ```bash
     docker-compose logs -f
     ```

4. To stop the project:

   ```bash
   docker-compose down
   ```
