# CalorieTracker

Calorie Tracker is a web application built with <strong>Spring Boot</strong>, allowing users to track their daily calorie intake and nutritional values. The application enables user registration, daily menu management, and product searching. The system administration can manage the product database and users.

## Technologies

- Java 21
- Spring Boot (Spring Security, Spring Data JPA, Spring Web)
- PostgreSQL (database)
- JWT (authentication)
- Maven (dependency management)
- Docker & Docker Compose (database containerization)

## Features

### Security

- JWT authentication for users
- different access levels (ADMIN and USER)
- endpoints secured with Spring Security

### User

- registration and login
- managing daily menus
- adding product amount to meals
- caloric and nutritional summary for menus and meals
- product search with filters

### Administrator

- adding, editing and deleting products
- editing and deleting users

### Installation and Setup

1. Clone the repo
2. Start the database using Docker Compose
3. Build and run the appliaction
4. The appliaction will be available at <strong>http://localhost:8080</strong>
5. Postman requests collection is in a file <strong>backend\src\test\resources\postman\calorie-tracker-requests.json</strong>
