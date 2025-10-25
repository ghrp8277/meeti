import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.meeti.app",
  appName: "Meeti",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};

export default config;
