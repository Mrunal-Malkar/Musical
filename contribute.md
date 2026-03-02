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