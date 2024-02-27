FROM gradle:8.5.0-jdk21 AS GRADLE_TOOL_CHAIN
COPY . /app/
WORKDIR /app/backend
RUN gradle clean build

FROM amazoncorretto:21-alpine
COPY --from=GRADLE_TOOL_CHAIN /app/backend/build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
