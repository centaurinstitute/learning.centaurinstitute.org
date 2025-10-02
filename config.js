const config = {
  appId: "10b7bc8c-a49c-4002-b0ec-63599e4b5210",
  name: "Centaur Learning",
  base: "/",
  api: "http://localhost:3000",
  socket: {
    host: "http://localhost:3003",
    path: "/socket.io",
  },
  project: {
    github: {
      authUrl: "https://github.com/login/oauth/authorize",
      clientId: "Ov23li479T0eT4ubQXsV",
      redirectUri: "http://localhost:5173/callback",
      userUrl: "https://api.github.com/user",
      scope: "user",
      response_type: "code",
    },
  },
};

export default config;
