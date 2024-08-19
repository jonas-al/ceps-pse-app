import { Text, View } from "react-native";

// Componentes
import { ActivityIndicator, MD3Colors } from "react-native-paper";

const Loading = () => {
  return (
    <View className="flex-1 bg-brown-500 items-center justify-center">
      <ActivityIndicator
        animating
        color="#fff"
        size={75}
      />
    </View>
  );
};

export default Loading;
