const config = {
  project: {
    label: "Team",
    oauth: {
      jwt: {
        identifier: "id",
      },
      providers: {
        github: {
          tokenUrl: "https://github.com/login/oauth/access_token",
          userUrl: "https://api.github.com/user",
          clientId: "Ov23liiZwoMoHLSbtIS3",
          userIdentifier: "id",
          userFields: {
            name: "login",
            displayName: "name",
            avatarUrl: "avatar_url",
            email: "email",
          },
        },
        linkedin: {
          tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
          userUrl: "https://api.linkedin.com/v2/userinfo",
          clientId: "77squyqj8fw5zu",
          userIdentifier: "sub",
          userFields: {
            name: "name",
            displayName: "name",
            avatarUrl: "picture",
            email: "email",
          },
        },
      },
    },
  },
  postgres: {
    uri: "sqlite::memory:",
    debug: true,
    sync: true,
  },
  dynamodb: {
    region: "us-east-1",
  },
};
