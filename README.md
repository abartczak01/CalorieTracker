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

### App Overview 

## Welcome Page
![welcome-page](https://github.com/user-attachments/assets/762ae0d5-2699-42ce-99ee-80fec34158ea)

## Auth Pages
![register](https://github.com/user-attachments/assets/592098a8-9cd8-4df2-8761-a6f9341f12f2)
![login](https://github.com/user-attachments/assets/5fd762f9-7726-4266-8368-32ba183ac550)

## Daily Menu 
![daily-menu](https://github.com/user-attachments/assets/92283f52-206d-40d2-a35e-64348cce37a7)

## Add a Product To a Meal
![add-to-meal](https://github.com/user-attachments/assets/3310a899-8d9f-41a3-a065-9241d7c749e9)

## Edit and Remove a Product From a Meal
![edit-quantity](https://github.com/user-attachments/assets/fc720d87-7940-4672-9f85-cb03b47ecd38)
![delete-quantity](https://github.com/user-attachments/assets/04439130-a19a-4eb0-bd66-b501d3d6a8f3)

## Account Details 
![profile-view](https://github.com/user-attachments/assets/1f79c457-daca-493b-a165-0b69390385d6)

## Admin Views
- Products List
  ![product-list](https://github.com/user-attachments/assets/825bc0cf-0005-42ef-8539-450223dad9cc)

- Add/Edit Product Form
  ![add-edit-product](https://github.com/user-attachments/assets/e5d32f8c-f08c-4468-a926-5a36cf32a8be)

- Product Details
  ![product-details](https://github.com/user-attachments/assets/0174687c-8a0b-4984-bf4e-35f2e8cff99a)
