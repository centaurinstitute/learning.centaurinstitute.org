import axios from "axios";
import config from "../../config";
import { storage } from "@nucleoidjs/webstorage";

export type CurrentUserIdentity = {
  name: string | null;
  email: string | null;
  identityProvider: string | null;
};

async function getGithubIdentity(): Promise<CurrentUserIdentity> {
  const identityProvider = "GITHUB";
  const token = await storage.get("link", "refreshToken");
  if (!token) {
    return { name: null, email: null, identityProvider };
  }

  try {
    const { data } = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      name: data.login || null,
      email: data.email || null,
      identityProvider,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub user details:", error);
    return { name: null, email: null, identityProvider };
  }
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
      return { name: null, email: null, identityProvider: identityProvider || null };
  }
}
