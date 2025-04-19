🎵 Musical


Musical is a full-stack music-sharing web app built with Next.js, designed to create a social and collaborative space for discovering, sharing, and voting on YouTube music streams. It features two main interactive environments: World and Zone.

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



⚙️ Installation

-Clone the repo:

git clone https://github.com/your-username/musical.git

cd musical


Install dependencies:

yarn install


npm install

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


🔧 Features Overview


✨ Future Plans

-🌐 Global chat for music discussions

-🔥 Real-time sync playback in Zone

-🔍 Improved search and filtering

🙏 Contributing

We welcome contributions! Feel free to open issues or pull requests. For major changes, please open an issue first to discuss what you'd like to change.


✉️ License

MIT License. Feel free to use, modify, and distribute with credit.


Made with ♥ by the MRUNAL.
