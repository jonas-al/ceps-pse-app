import { View, Text, StatusBar } from "react-native";

import { MD2Colors, IconButton } from "react-native-paper";

import { Link } from "expo-router";

export default function SplashScreen() {
  return (
    <View className="flex-1 bg-brown-500 p-10">
      <View className="flex-1 gap-3 justify-center">
        <Text className="text-dark-500 text-5xl font-bold">PSE UFPA</Text>
        <Text className="text-white text-4xl font-bold">
          Indígenas e Quilombolas
        </Text>
      </View>
      <View className="flex-1 justify-center items-center gap-2">
        <Text className="text-white font-bold text-3xl">Ir para o login</Text>
        <Link href="/login">
          <IconButton
            icon="chevron-right"
            iconColor={MD2Colors.blueGrey900}
            mode="contained"
            containerColor="white"
            size={38}
          />
        </Link>
      </View>
    </View>
  );
}
