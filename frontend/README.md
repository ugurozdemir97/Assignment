Navigate to frontend folder in terminal and type:
npm install
npm run dev
The server will run on http://localhost:5173/

/*************** FRONTEND STRUCTURE ***************/

/frontend                    # Frontend (React + TypeScript)
├── public/                  # Static assets (Logo, edit and delete icons)
├── src/                     # Source code
│   ├── components/          # Reusable UI components (Delete post/user component. New post component)
│   ├── auth/                # Login and Sign Up forms
│   ├── header/              # Header and Footer
│   ├── pages/               # Page level components (Posts page, Users Page, User Profile)
│   ├── types/               # TypeScript type definitions
│   ├── assets/              # App icon
│   └── App.tsx              # Main app component
├── index.html               # Main HTML file
├── eslint.config.js         # ESLint configuration
├── .prettierrc              # Prettier configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation
