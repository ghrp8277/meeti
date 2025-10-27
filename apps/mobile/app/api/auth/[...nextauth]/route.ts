import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const dynamic = "force-dynamic";

declare module "next-auth" {
  interface User {
    accessToken?: string;
  }

  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const createCredentialsProvider = () => {
  return CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      return await authenticateUser(credentials);
    },
  });
};

const authenticateUser = async (credentials: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials?.email,
        password: credentials?.password,
      }),
    });

    const data = await response.json();

    if (response.ok && data.data?.accessToken) {
      return {
        id: data.data.sub || "1",
        email: credentials?.email,
        accessToken: data.data.accessToken,
      };
    }

    return null;
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
};

const createJwtCallback = () => {
  return async ({ token, user }: any) => {
    if (user?.accessToken) {
      token.accessToken = user.accessToken;
    }
    return token;
  };
};

const createSessionCallback = () => {
  return async ({ session, token }: any) => {
    if (token.accessToken) {
      session.accessToken = token.accessToken;
    }
    return session;
  };
};

const handler = NextAuth({
  providers: [createCredentialsProvider()],
  callbacks: {
    jwt: createJwtCallback(),
    session: createSessionCallback(),
  },
  pages: {
    signIn: "/login/email",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
