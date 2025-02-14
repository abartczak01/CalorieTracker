# Frontend - Calorie Tracker

## Overview

This is the frontend of the Calorie Tracker application, built using Angular. It provides a user-friendly interface for tracking calorie intake, managing meals, and viewing statistics.

## Requirements

Before running the frontend, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (recommended version: 18.x or later)
- [Angular CLI](https://angular.io/cli) (install globally with `npm install -g @angular/cli`)

## Technologies Used

- **Angular 18.2.0**
- **Angular Material** (UI components)
- **Bootstrap 5.3.3** (styling framework)
- **RxJS** (reactive programming)
- **JWT-decode** (for handling authentication tokens)

## Installation

1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Running the Frontend

To start the development server:

```sh
ng serve
```

By default, the application will be available at:

```
http://localhost:4200
```

## Proxy Configuration

The frontend uses a proxy to communicate with the backend. Ensure the `proxy.conf.json` file is correctly set up to forward API requests.
