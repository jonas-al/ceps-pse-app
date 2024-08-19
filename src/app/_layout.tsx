import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useEffect } from "react";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { usePreventScreenCapture } from "expo-screen-capture";
import { StatusBar } from "react-native";

// Contexts
import { AuthProvider } from "@/src/contexts/auth";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

// Styles
import "../styles/global.css";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#bd773c",
    surfaceVariant: "#F5F5F5",
  },
};

export const unstable_settings = {
  initialRouteName: "splash-screen",
};

export default function Root() {
  usePreventScreenCapture();
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <AuthProvider>
            <Slot />
          </AuthProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}
