# Calorie Tracker

Calorie Tracker is a web application designed to help users monitor their daily calorie intake, manage meals, and track nutrition goals. It consists of two main components:

- **Backend**: A Spring Boot application that handles authentication, data storage, and API logic.
- **Frontend**: An Angular 18 web interface that provides a user-friendly experience.

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
- editing/deleting user's account

### Administrator

- adding, editing and deleting products

## Technologies Used

### Frontend:

- **Angular 18.2.0**
- **Angular Material** (UI components)
- **Bootstrap 5.3.3** (styling framework)
- **RxJS** (reactive programming)
- **JWT-decode** (for handling authentication tokens)

### Backend:

- **Java 21**
- **Spring Boot** (Spring Security, Spring Data JPA, Spring Web)
- **PostgreSQL** (database)
- **JWT** (authentication)
- **Maven** (dependency management)
- **Docker** (database containerization)
- **Lombok**

# Getting Started

To run the project locally, follow these steps:

## 1. Start the Backend

### Requirements

Before running the backend, ensure you have the following installed:

- [Java 21](https://www.oracle.com/pl/java/technologies/downloads/#jdk21)
- [Maven](https://maven.apache.org/download.cgi)
- [Docker & Docker Compose](https://docs.docker.com/get-started/get-docker/)

### Start the database

```sh
docker-compose up -d
```

### Build and run the application using Maven:

```sh
mvn spring-boot:run
```

### The API should now be accessible at `http://localhost:8080`

### postman collection is in a backend directory /src/test/resources/postman

## 2. Start the Frontend

### Requirements

Before running the frontend, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (recommended version: 18.x or later)
- [Angular CLI](https://angular.io/cli) (install globally with `npm install -g @angular/cli`)

### Installation

1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Frontend

To start the development server:

```sh
ng serve
```

By default, the application will be available at:

```
http://localhost:4200
```

### Proxy Configuration

The frontend uses a proxy to communicate with the backend. Ensure the `proxy.conf.json` file is correctly set up to forward API requests.

### Admin's account is available with credentials:

- e-mail: admin@example.com
- password: admin123
