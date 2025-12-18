import axios from "axios";
import config from "../../config";
import { storage } from "@nucleoidjs/webstorage";

declare module "axios" {
  interface AxiosInstance {
    getUserDetails(): Promise<{
      name: string;
      avatarUrl: string;
      id: string | number;
    } | null>;
  }
}

const instance = axios.create({
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});

instance.interceptors.request.use(async (request) => {
  const refreshToken = await storage.get("link", "refreshToken");
  if (refreshToken) {
    request.headers["Authorization"] = `Bearer ${refreshToken}`;
  }
  return request;
});

instance.getUserDetails = async () => {
  const refreshToken = await storage.get("link", "refreshToken");
  const { project } = config;
  const { github, google, linkedin } = project;

  let userUrl;
  let provider;
  if (linkedin) {
    userUrl = linkedin.userUrl;
    provider = "linkedin";
  } else if (google) {
    userUrl = google.userUrl;
    provider = "google";
  } else if (github) {
    userUrl = github.userUrl;
    provider = "github";
  }

  if (refreshToken) {
    try {
      const response = await axios.get(userUrl, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      if (provider === "linkedin") {
        return {
          name: response.data.name,
          avatarUrl: response.data.picture,
          id: response.data.sub,
        };
      } else if (provider === "github") {
        return {
          name: response.data.login,
          avatarUrl: response.data.avatar_url,
          id: response.data.id,
        };
      } else if (provider === "google") {
        return {
          name: response.data.name,
          avatarUrl: response.data.picture,
          id: response.data.id,
        };
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      throw error;
    }
  }
  return null;
};

export default instance;
