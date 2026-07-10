import axios from "axios";

type GithubUser = {
  login: string;
};

type GithubEmail = {
  email: string;
  primary: boolean;
  verified: boolean;
};

async function fetchIdentity(
  token: string,
): Promise<{ name: string | null; email: string | null }> {
  try {
    const [{ data: user }, { data: emails }] = await Promise.all([
      axios.get<GithubUser>("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get<GithubEmail[]>("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
      }),
    ]);

    const primaryEmail =
      emails.find((entry) => entry.primary && entry.verified) ||
      emails.find((entry) => entry.verified) ||
      emails[0];

    return {
      name: user.login || null,
      email: primaryEmail?.email || null,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub identity:", error);
    return { name: null, email: null };
  }
}

export default { fetchIdentity };
