
This is a simple project with a React + TypeScript frontend and a NestJS backend that supports basic CRUD operations.

There is no hashing algorithms for passwords and no cookies or sessions for login/logout. It's just simulating a login logout system.
There is no database, all data is hard coded in backend/src/users/users.service.ts and backend/src/posts/posts.service.ts

If you don't login, you can view posts and users. Admins' usernames are red.
If you login as a normal user, you can create posts and edit/delete your own posts.
If you login as an admin, you can edit/delete all posts and you can also delete users.

Login checks if the username exist and if the password is correct.
Sign up page checks for unique username and email. In sign up form you can check "Is Admin" to create an admin user.

You need React and NestJS downloaded.

To set up:

Navigate to backend in terminal and type:
npm install
npm run start
The server will run on http://localhost:3000/

Navigate to frontend in terminal and type:
npm install
npm run dev
The server will run on http://localhost:5173/

Now you can go to http://localhost:5173/ and use the app.

<pre>
Assignment/
├── backend/                         # Backend (NestJS)
│   ├── src/                         # Source code
│   │   ├── posts/                   # Posts related files
│   │   ├── users/                   # Users related files
│   │   ├── types/                   # TypeScript interface definitions
│   │   └── main.ts                  # Backend server entry point
│   ├── eslint.config.mjs            # ESLint configuration
│   ├── .prettierrc                  # Prettier configuration
│   ├── tsconfig.json                # TypeScript configuration
│   ├── package.json                 # Project metadata and dependencies
│   └── README.md                    # Backend documentation
│
├── frontend/                        # Frontend (React + TypeScript)
│   ├── public/                      # Static assets (logo, edit/delete icons)
│   ├── src/                         # Source code
│   │   ├── components/              # Reusable UI components (delete post/user, new post)
│   │   ├── auth/                    # Login and Sign Up forms
│   │   ├── header/                  # Header and Footer
│   │   ├── pages/                   # Page level components (Posts, Users, Profile)
│   │   ├── types/                   # TypeScript type definitions
│   │   ├── assets/                  # App icon
│   │   └── App.tsx                  # Main app component
│   ├── index.html                   # Main HTML file
│   ├── eslint.config.js             # ESLint configuration
│   ├── .prettierrc                  # Prettier configuration
│   ├── tsconfig.json                # TypeScript configuration
│   ├── package.json                 # Project metadata and dependencies
│   └── README.md                    # Frontend documentation
│
└── README.md                        # Root documentation
</pre>