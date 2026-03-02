🎵 Musical

Musical is a full-stack music-sharing web app built with Next.js, designed to create a social and collaborative space for discovering, sharing, and voting on YouTube music streams. It features two main interactive environments: World and Zone.
![Screenshot (43)](https://github.com/user-attachments/assets/69c7611e-ee45-4648-9db1-84a1e913a856)

🌍 World

The World page is a global feed showcasing all YouTube music streams shared by users across the platform.

Key Features:

-🔊 Discover music shared by users globally

-👍 Upvote your favorite streams to boost their visibility

-🌟 Top-voted tracks rise on the leaderboard

-🚀 One-click play and real-time updates


🌐 Zone

The Zone is a private room-like environment, where users can form or join custom music-sharing spaces.


Key Features:

-🔑 Join or create your own "Zone" with a name

-🎓 Add and upvote tracks collaboratively

-💬 Perfect for friend groups or music communities

-✨ Clean, real-time experience exclusive to your group


🚀 Tech Stack

-Frontend: Next.js, Tailwind CSS

-Backend: Next.js API Routes.

-Database: MongoDB

-Authentication: NextAuth.js

-State Management: React Context / Hooks

-Styling: TailwindCSS, FontAwesome Icons



⚙️ Contributing:-
Contributing to the Project 🚀

Thank you for your interest in contributing!
We welcome bug fixes, feature improvements, UI enhancements, documentation updates, and thoughtful suggestions.

Please follow the guidelines below to set up the project locally and submit contributions properly.

🛠 Local Development Setup

1. Fork & Clone the Repository

First, fork this repository to your GitHub account.

Then clone your fork:
```
git clone https://github.com/<your-username>/<repository-name>.git
cd <repository-name>
```

2. Install Dependencies

Make sure you have:

Node.js (v18 or later recommended)

npm (comes with Node.js)

Install project dependencies:
```
npm install
```

3. Set Up MongoDB Atlas

This project requires a MongoDB database.

Steps:

Create a free account at MongoDB Atlas.

Create a new project.

Create a cluster (Free tier is sufficient).

Create a database user (username and password).

Add your IP address to the Network Access list.

Copy your connection string.

It will look similar to this:
```
mongodb+srv://username:<password>@cluster-name.mongodb.net/
```

4. Configure Environment Variables

Create a .env file in the root directory of the project.

Add the following variable:
```
MONGOOSE_PASSWORD=your_mongodb_password_here
```

Important:

Replace your_mongodb_password_here with the password you created in MongoDB Atlas.

Do NOT wrap the password in quotes unless it contains special characters.

Do NOT commit your .env file.

Ensure .env is listed in .gitignore.

The application is configured to inject this password into the MongoDB connection URI.



5. Create a New Branch

Before making changes, create a new branch.

For a feature:
```
git checkout -b feature/feature-name
```

For a bug fix:
```
git checkout -b fix/issue-description
```
Do not commit directly to the main branch.



6. Run the Development Server

Start the development server:
```
npm run dev
```
If everything is configured correctly, the application should now be running locally.



🧠 Contribution Guidelines

To maintain code quality and consistency:

Keep pull requests focused on one feature or issue.

Write clean, readable, and maintainable code.

Follow the existing project structure.

Avoid adding unnecessary dependencies.

Test your changes before submitting.

Do not push secrets, API keys, or environment files.


🎯 Commit Message Convention

Use clear and descriptive commit messages.

Examples:

feat: add zone creation feature

fix: resolve upvote counter bug

refactor: improve trending card layout

docs: update contributing guide

Consistent commit messages make the project easier to maintain.


🚀 Submitting a Pull Request

Push your branch:

git push origin feature/feature-name

Open a Pull Request from your fork to the main repository.

Clearly describe:

What you changed

Why you changed it

Any relevant screenshots (for UI changes)

If your PR resolves an issue, reference it like:

Closes #12


🧪 Reporting Issues

If you discover a bug:

Provide a clear description.

Include steps to reproduce the issue.

Mention your environment (OS, browser, Node version).

Add screenshots if applicable.



💡 Suggesting Features

If you want to propose a new feature:

Open an issue first.

Explain the problem it solves.

Describe how it improves the project.

Keep suggestions aligned with the project's vision.



🤝 Code of Conduct

Be respectful, constructive, and professional in discussions.
We value thoughtful collaboration and meaningful contributions.

Thank you for helping improve this project 🙌
Your contributions make it better for everyone.



(optional - IF you want to acess sign-in feature which is needed for contributng. )
Setup environment variables:


Create a .env.local file and add necessary credentials (YouTube API keys, Auth providers, etc.)

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

NEXTAUTH_SECRET=

NEXTAUTH_URL=

YOUTUBE_API_KEY=

MONGOOSE_PASSWORD=


Run the app locally:

yarn dev
 or
  npm run dev



✨ Future Plans

-🌐 Global chat for music discussions

-🔥 Real-time sync playback in Zone

-🔍 Improved search and filtering

🙏 Contributing

We welcome contributions! Feel free to open issues or pull requests. For major changes, please open an issue first to discuss what you'd like to change.


✉️ License

MIT License. Feel free to use, modify, and distribute with credit.


Made with ♥ by the MRUNAL.
