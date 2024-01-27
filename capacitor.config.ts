import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "dev-mobile",
  webDir: "dist",
  bundledWebRuntime: false,
  server: {
    iosScheme: "http",
    androidScheme: "http",
    allowNavigation: ["*"],
  },
  android: {
    allowMixedContent: true,
  },
  plugins: {
      CapacitorHttp: {
        enabled: false,
      },
    },
};

export default config;
