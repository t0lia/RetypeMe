# RetypeMe - A platform to compete and show off how fast you can type on a keyboard

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
