FROM gradle:8.5.0-jdk21 AS GRADLE_TOOL_CHAIN
WORKDIR /app
COPY . /app/
RUN ./gradlew clean build

FROM amazoncorretto:21-alpine
COPY --from=GRADLE_TOOL_CHAIN /app/build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
