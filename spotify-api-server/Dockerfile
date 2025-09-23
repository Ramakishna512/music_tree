# Stage 1: Build the Spring Boot application
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-focal
WORKDIR /app

# Copy the jar (use wildcard to match versioned jar)
COPY --from=build /app/target/*.jar app.jar

# Expose the port that Spring Boot listens on
EXPOSE 8081

# Run the jar
ENTRYPOINT ["java","-jar","app.jar"]
