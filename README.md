# A Booking Hotel Flow `Fullstack` App
A Booking Hotel App is website for Booking Hotel. User can find any hotel based on city, choose a room, and input contact details for booking. 
While user can login/register to see the booking history or cancel the booking.
This project is monorepo supported by `Turborepo` contains Frontend (web) and Backend under `apps` folder. Supported by Bun as package manager.
![image](https://github.com/user-attachments/assets/64601023-af42-4b7c-a298-4b48f2013690)


# Running the Project
To run the project, first you need to setup dependencies:
## [Bun](https://bun.sh/) 
- Install Bun `curl -fsSL https://bun.sh/install | bash` or `npm install -g bun`
## Clone Project
- Clone Project, open in your vscode.
- run `bun install` in root project
- run `bun run dev`
- you will see on the terminal:
1. backend:dev: 🦊 Elysia is running at localhost:3000
2. docs:dev:   ➜  Local:   http://localhost:5173/
3. web:dev:   ➜  Local:   http://localhost:5174/
- Open in your browser `http://localhost:5174/` and `http://localhost:3000/swagger` (swagger for backend)
  

# Tech Stack
## Frontend
- Vite + React + Vanilla
- Language: Typescript
- CSS
## Backend
- [ElysiaJs](https://elysiajs.com/)
- [Prisma](https://prisma.io)
- Database: SQLite
- Language: Typescript
## State Management 
- [Zustand](https://zustand.docs.pmnd.rs/)
## Repo
- [Turborepo](https://turborepo.com/)
- Remote repository: Github
## Package Manager
- [Bun](https://bun.sh/)


