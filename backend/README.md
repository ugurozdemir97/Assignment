Navigate to backend folder in terminal and type:
npm install
npm run start
The server will run on http://localhost:3000/

/*************** BACKEND STRUCTURE ***************/

/backend                     # Backend (NestJS)
├── src/                     # Source code
│   ├── posts/               # Posts related files
│   ├── users/               # Users related files
│   ├── types/               # TypeScript interface definitions
│   └── main.ts              # Backend server entry point
├── eslint.config.mjs        # ESLint configuration
├── .prettierrc              # Prettier configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation