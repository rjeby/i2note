# Idea2Note (In Progress)

A simple full-stack web app for creating, organizing, and managing personal notes.

---

## Technical Stack

<div align="center">

| Icon                                                                                                          | Technology            | Purpose          |
| ------------------------------------------------------------------------------------------------------------- | --------------------- | ---------------- |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40"/> | **TypeScript**        | Type safety      |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40"/>           | **React**             | User interface   |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40"/>         | **Node.js (Express)** | Backend server   |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="40"/>           | **Redux**             | State management |
| <img src="https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/tailwindcss.svg" width="40"/>                   | **Tailwind CSS**      | Styling          |

</div>

---

## Main Features

### Landing Page (Sign In / Sign Up)

<p align="center">
  <img src="images/landing_page.png" width="45%" />
  <img src="images/sign_up.png" width="45%" />
</p>

- User authentication (Sign In / Sign Up)
- Clean landing experience
- Secure access to personal notes

### Account Page (Notes & Tags)

<p align="center">
  <img src="images/all_notes.png" width="70%" />
</p>

- View all notes
- View archived notes
- Filter by:
  - Tag
  - Title
- Tag system for organization

### View, Edit, and Manage Notes

<p align="center">
  <img src="images/note_info.png" width="70%" />
</p>

- Open note details
- Edit note content
- Delete notes
- Archive / Unarchive notes

### Create Notes

<p align="center">
  <img src="images/create_note.png" width="70%" />
</p>

- Create new notes
- Add tags
- Save and manage content easily

---

## How to Start the App

### 1. Clone repository

```bash
git clone <your-repo-url>
cd i2note
```

### 2. Install dependencies

Install packages for both backend and frontend:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Create `.env` file

Inside the **backend** directory, create a file called `.env` and add:

```env
DATABASE_URL="file:./dev.db"
PORT="3000"
TRANSPORTER_EMAIL="your-email@gmail.com"
TRANSPORTER_PASSWORD="gmail-app-password"
SECRET="your-secret-key"

VITE_BACKEND_BASE_URI="http://localhost:3000"
VITE_FRONTEND_BASE_URI="http://localhost:5173"
```

### 4. Setup database

Inside **backend** folder:

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Run the project

Start backend:

```bash
cd backend
npm run dev
```

Start frontend:

```bash
cd frontend
npm run dev
```

---

The application should now be running locally.
