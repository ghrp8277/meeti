export const PATH = {
  MY: {
    ROOT: "/my",
    SETTING: "/my/setting",
    PROFILE: "/my/profile",
    POINT: "/my/point",
    CARD: {
      ROOT: "/my/card",
      CREATE: "/my/card/create",
    },
    ACCOUNT_REGISTER: "/my/account-register",
    POINT_GUIDE: "/my/profile/point-guide",
  },
  LOGIN: {
    ROOT: "/login",
    EMAIL: "/login/email",
  },
  SIGNUP: {
    ROOT: "/signup",
  },
  MAIN: {
    ROOT: "/",
  },
  TRANSFER: {
    ROOT: "/transfer",
    CREATE: "/transfer/create",
  },
  COMPANION: {
    ROOT: "/companion",
  },
  CHAT: {
    ROOT: "/chat",
    ID: "/chat/:id",
  },
  GUIDE: {
    ROOT: "/guide",
  },
} as const;
