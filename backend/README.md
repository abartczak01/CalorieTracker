# CalorieTracker

Calorie Tracker is a web application built with <strong>Spring Boot</strong>, allowing users to track their daily calorie intake and nutritional values. The application enables user registration, daily menu management, and product searching. The system administration can manage the product database and users.

## Technologies

- Java 21
- Spring Boot (Spring Security, Spring Data JPA, Spring Web)
- PostgreSQL (database)
- JWT (authentication)
- Maven (dependency management)
- Docker & Docker Compose (database containerization)
- Lombok

## Features

### Security

- JWT authentication for users
- different access levels (ADMIN and USER)
- endpoints secured with Spring Security

### User

- registration and login
- managing daily menus
- adding product amount to meals
- nutritional summary for menus and meals
- product search with filters

### Administrator

- adding, editing and deleting products
- editing and deleting users

## Running the Backend

1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Start the PostgreSQL database with Docker Compose:
   ```sh
   docker-compose up -d
   ```
3. Build and run the application using Maven:
   ```sh
   mvn spring-boot:run
   ```
4. The API should now be accessible at `http://localhost:8080`
