const config = {
  appId: "10b7bc8c-a49c-4002-b0ec-63599e4b5210",
  name: "Centaur Learning",
  base: "/",
  api: "https://api.centaurinstitute.org:5050",
  socket: {
    host: "https://api.centaurinstitute.org:5050",
    path: "/socket.io",
  },
  project: {
    github: {
      authUrl: "https://github.com/login/oauth/authorize",
      clientId: "Ov23liiZwoMoHLSbtIS3",
      redirectUri: "https://learning.centaurinstitute.org/callback/github",
      userUrl: "https://api.github.com/user",
      scope: "user",
      response_type: "code",
    },
    linkedin: {
      authUrl: "https://www.linkedin.com/oauth/v2/authorization",
      clientId: "77um8dvw6y93ts",
      redirectUri: "https://learning.centaurinstitute.org/callback/linkedin",
      userUrl: "https://api.linkedin.com/v2/userinfo",
      scope: "openid profile email",
      response_type: "code",
    },
  },
};

export default config;
