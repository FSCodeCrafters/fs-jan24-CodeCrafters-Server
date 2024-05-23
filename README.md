# Mobile Store Backend

Welcome to the Mobile Store Backend project! This backend is developed using Node.js, Express, PostgreSQL, and Prisma.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project aims to create a robust backend for a mobile store application where users can browse through different mobile devices, view details, and make purchases. It provides a RESTful API built with Node.js and Express, using PostgreSQL as the database and Prisma as the ORM for efficient data management.

## Features

- **Mobile Devices API**: Endpoints to manage mobile devices - reading.
- **Search Functionality**: API to filter and search for specific mobile devices.
- **Database Management**: Utilizes PostgreSQL for reliable data storage and Prisma for database schema and migrations.

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed on your machine:

- Node.js (v20.11.0 or later)
- npm (v10.2.4 or later)
- PostgreSQL (v14 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/fs-jan24-CodeCrafters/mobile-store-backend.git

   ```

2. Navigate to the project directory:

   ```bash
   cd mobile-store-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the App

To run the application locally, use the following command:

```bash
    npm start
```

or for development

```bash
    npm run dev
```

This will start the server, and you can access the API at http://localhost:3000/.

## Folder Structure

The project follows a standard folder structure for better organization:

```graphql
fs-jan24-CodeCrafters-Server/
│
├── prisma/ # Prisma schema and migrations
│ ├── migrations/ # Database migration files
│ └── schema.prisma # Prisma schema file
│
├── src/ # Source files
│ ├── controllers/ # Express route controllers
│ ├── middleware/ # Custom middleware
│ ├── models/ # Prisma models
│ ├── routes/ # Express routes
│ ├── services/ # Business logic and services
│ ├── utils/ # Utility functions
│ ├── app.ts # Express app configuration
│ └── server.ts # Entry point of the application
│
├── .env # Environment variables
├── .gitignore # Git ignore file
├── package.json # Project metadata and dependencies
└── README.md # Project documentation
```

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.