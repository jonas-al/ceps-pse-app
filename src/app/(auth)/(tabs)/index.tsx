import { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import ActionCard from "@/src/components/action-card";
import { IconButton, Portal, Modal, List } from "react-native-paper";

// Contexts
import AuthContext from "@/src/contexts/auth";

// Hooks
import useStorage from "@/src/hooks/useStorage";

export default function Home() {
  const { Logout } = useContext(AuthContext);
  const { getAll } = useStorage();
  const [registrations, setRegistrations] = useState<string[]>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getRegistrations = async () => {
      const response = await getAll("@registrations");

      if (response) setRegistrations(response);
    };

    getRegistrations();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 28,
        gap: 64,
      }}
    >
      <View className="flex flex-col gap-4">
        <View className="flex flex-row items-center justify-end">
          <Text className="font-regular">Sair</Text>
          <IconButton
            mode="contained-tonal"
            icon="logout"
            size={25}
            onPress={async () => await Logout()}
            className="bg-slate-200"
          />
        </View>
        <Text className="text-dark-500 text-3xl font-semibold">
          Seja bem vindo(a)
        </Text>
      </View>

      <View className="flex-1 gap-4">
        <Text className="text-dark-500 text-2xl font-semibold">
          O que você deseja fazer?
        </Text>
        <View className="flex flex-row gap-4">
          <ActionCard
            illustration="chat"
            bgColor="bg-brown-500"
            text="Iniciar nova entrevista"
            href="/form"
          />
          <ActionCard
            illustration="planning"
            text="Consultar entrevistas"
            href="/saved-interviews"
          />
        </View>
      </View>

      <View className="flex-1 flex flex-row">
        <View className="flex-1 flex flex-col items-center justify-center gap-2">
          <TouchableOpacity
            className="flex justify-center items-center w-[80px] h-[80px] bg-emerald-400 rounded-full shadow-sm shadow-black"
            activeOpacity={0.75}
            onPress={() => setVisible(true)}
          >
            <Text className="text-3xl font-bold text-white">
              {registrations?.length}
            </Text>
          </TouchableOpacity>
          <View>
            <Text className="text-xl font-regular text-center">
              Entrevistas realizadas
            </Text>
          </View>
        </View>

        <View className="flex-1 flex flex-col items-center justify-center gap-2">
          <View className="flex justify-center items-center w-[80px] h-[80px] bg-amber-400 rounded-full shadow-sm shadow-black">
            <Text className="text-3xl font-bold text-white">{9}</Text>
          </View>
          <View>
            <Text className="text-xl font-regular text-center">
              Entrevistas pendentes
            </Text>
          </View>
        </View>
      </View>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
        >
          <View className="bg-white mx-8 rounded-md gap-4 max-h-screen">
            <View className="bg-brown-800 rounded-t-md flex-row justify-between items-center px-4">
              <Text className="text-white text-lg font-bold">
                Entrevistas realizadas
              </Text>
              <IconButton
                icon="close"
                size={24}
                onPress={() => setVisible(false)}
                iconColor="white"
              />
            </View>
            <ScrollView className="pb-8">
              <List.Section>
                <List.Subheader>Inscrições</List.Subheader>
                {registrations?.map((registration, index) => (
                  <List.Item
                    key={index}
                    title={registration}
                    left={() => <List.Icon icon="account-check" />}
                    className="pl-8"
                  />
                ))}
              </List.Section>
            </ScrollView>
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}
