import { useContext } from "react";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "react-native";

// Components
import Loading from "@/src/components/loading";

// Contexts
import AuthContext from "@/src/contexts/auth";

export default function AppLayout() {
  const { isSignedIn, loading } = useContext(AuthContext);

  if (loading) return <Loading />;

  if (!isSignedIn) return <Redirect href="/splash-screen" />;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
}
