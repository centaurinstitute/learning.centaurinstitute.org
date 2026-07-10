import config from "../../config";
import { storage } from "@nucleoidjs/webstorage";

export type CurrentUserIdentity = {
  name: string | null;
  email: string | null;
  identityProvider: string | null;

  providerToken?: string | null;
};

async function getGithubIdentity(): Promise<CurrentUserIdentity> {
  const identityProvider = "GITHUB";
  const token = await storage.get("link", "refreshToken");
  return {
    name: null,
    email: null,
    identityProvider,
    providerToken: token || null,
  };
}

function getCognitoIdentity(): CurrentUserIdentity {
  const identityProvider = "COGNITO";
  const { credentials } = config;
  const prefix = `CognitoIdentityServiceProvider.${credentials.clientId}.`;

  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key && key.startsWith(prefix) && key.endsWith(".signInDetails")) {
      try {
        const signInDetails = JSON.parse(window.localStorage.getItem(key)!);
        const email = signInDetails.loginId || null;
        return { name: email, email, identityProvider };
      } catch (error) {
        console.error("Failed to parse Cognito signInDetails:", error);
      }
    }
  }

  return { name: null, email: null, identityProvider };
}

export async function getCurrentUserIdentity(): Promise<CurrentUserIdentity> {
  const identityProvider = await storage.get("link", "identityProvider");

  switch ((identityProvider || "").toUpperCase()) {
    case "GITHUB":
      return getGithubIdentity();
    case "COGNITO":
      return getCognitoIdentity();
    default:
      return {
        name: null,
        email: null,
        identityProvider: identityProvider || null,
      };
  }
}
