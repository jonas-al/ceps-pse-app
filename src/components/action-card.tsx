import { Text, Image, TouchableOpacity } from "react-native";
import { router, Href } from "expo-router";

type ActionCardProps = {
  bgColor?: string;
  text?: string;
  illustration?: string;
  href: Href;
};

const ActionCard = ({
  bgColor = "bg-brown-300",
  text = "Texto",
  illustration = "chat",
  href,
}: ActionCardProps) => {
  return (
    <TouchableOpacity
      className={`flex-1 ${bgColor} rounded-2xl items-center max-h-72 p-4 shadow-md shadow-black`}
      activeOpacity={0.85}
      onPress={() => router.push(href)}
    >
      <Image
        source={
          illustration === "chat"
            ? require("../assets/chat-illustration.png")
            : require("../assets/planning-illustration.png")
        }
        className="w-36 h-40"
      />
      <Text className="text-white text-lg font-semibold text-center">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionCard;
