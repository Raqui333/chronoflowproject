# Chrono Flow Project

**Chrono Flow Project** is a task flow platform designed to showcase my experience in software development using cutting-edge technologies. This project demonstrates proficiency in both backend and frontend development, containerization, and deployment practices.

> This project is a work in progress. New features and improvements are continuously being developed.

---

## Features

- Built with modern frameworks: **NestJS** for backend and **Next.js** for frontend.
- Fully containerized with **Docker** and orchestrated using **Docker Compose**.
- Comprehensive test coverage with **Jest**.
- Written entirely in **TypeScript** for type safety and maintainability.
- Scalable and modular architecture for future enhancements.

---

## Technologies Used

### Backend:
![Nest.js](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-%232D3748?style=flat&logo=prisma)

- **Nest.js**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **PostgreSQL**: Used for database management due to its reliability and scalability.
- **Prisma**: Simplifies database integration, providing a robust and easy-to-use API for data operations.

#### Entity-Relationship Diagram (ERD)
The Entity-Relationship Diagram (ERD) provides a high-level overview of the database structure and the relationships between entities in the system. This diagram helps visualize how data flows and how different components of the application interact with each other.
![ERD](docs/erd.png)

### Frontend:
![Next.js](https://img.shields.io/badge/Next.js-545454?style=flat&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=white)

- **Next.js**: A React framework for production-grade web applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Redux**: For state management to maintain a predictable and centralized state across the application.
  
### Tools and Infrastructure (DevOps):
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Docker-compose](https://img.shields.io/badge/Docker%20Compose-2496ED?style=flat&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![pgAdmin](https://img.shields.io/badge/pgAdmin-336791?style=flat&logo=postgresql&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)
    
- **Docker**: For containerization of the application.
- **Docker Compose**: For managing multi-container applications.
- **Git**: Version control system.
- **pgAdmin**: For creating, managing, and querying databases efficiently.
- **Jest**: For unit and integration testing.

---

## Installation and Execution

### Prerequisites

Ensure the following tools are installed on your system:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Steps to Run the Project

1. Clone this repository:
   ```bash
   git clone https://github.com/Raqui333/chronoflowproject.git
   cd chronoflowproject
   ```
2. Set up environment variables by creating two .env files based on the .env.example file: one in the root directory and another in the backend directory:
   ```javascript
   // .env
   POSTGRES_USER="postgres_user"
   POSTGRES_PASSWORD="postgres_password"
   POSTGRES_DB="database_name"
   ```

   ```javascript
   // backend/.env
   DATABASE_URL="postgresql://<postgres_user>:<postges_password>@localhost:5432/database_name"
   ```

3. Build and run the containers using Docker Compose:
   ```bash
   docker-compose up --build
   ```
4. Access the application:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Database: http://localhost:5432