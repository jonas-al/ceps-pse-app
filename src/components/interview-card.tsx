import { useState } from "react";
import {
  Portal,
  Modal,
  IconButton,
  Button,
  Divider,
  MD3Colors,
} from "react-native-paper";
import { Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import { Models } from "@/src/@types";

// Hooks
import useStorage from "@/src/hooks/useStorage";

type InterviewCardProps = {
  interview: Models.Interview;
  setInterviews: (interviews: Models.Interview[]) => void;
  id: number;
};

const InterviewCard = ({
  interview,
  setInterviews,
  id,
}: InterviewCardProps) => {
  const [visibleActionModal, setVisibleActionModal] = useState(false);
  const [visibleRemoveModal, setVisibleRemoveModal] = useState(false);

  const { remove } = useStorage();

  const handleRemoveInterview = async () => {
    const _interviews = await remove("@interviews", interview);
    if (_interviews) setInterviews(_interviews);
    setVisibleRemoveModal(false);
  };

  return (
    <View>
      <TouchableOpacity
        className="flex flex-row justify-between items-center bg-brown-700 p-4 rounded-2xl shadow-md shadow-black"
        onPress={() => setVisibleActionModal(true)}
        activeOpacity={0.9}
      >
        <View className="flex gap-4">
          <View className="self-start bg-gray-500 p-2 rounded">
            <Text className="text-white text-xs font-semibold">Entrevista</Text>
          </View>
          <View className="flex flex-col gap-2">
            <Text className="text-white text-xl font-bold">
              {interview["nome-candidato"]}
            </Text>
            <Text className="text-white text-xl font-regular">
              Inscrição: {interview["numero-inscricao"]}
            </Text>
          </View>
        </View>
        <View className="flex justify-center items-center bg-white p-8 rounded-lg">
          <Text className="text-3xl font-bold">
            {interview["pontuacao-total"].toFixed(1)}
          </Text>
        </View>
      </TouchableOpacity>

      <Portal>
        <Modal
          visible={visibleActionModal}
          onDismiss={() => setVisibleActionModal(false)}
        >
          <View className="bg-white mx-4 rounded-md gap-4">
            <View className="bg-brown-800 rounded-t-md flex-row justify-between items-center px-4">
              <Text className="text-white text-lg font-bold">Entrevista</Text>
              <IconButton
                icon="close"
                size={24}
                onPress={() => setVisibleActionModal(false)}
                iconColor="white"
              />
            </View>
            <View className="px-4 pb-8 gap-4">
              <Text className="text-xl font-semibold">
                O que você deseja fazer?
              </Text>
              <Divider />
              <View className="flex-row gap-1 justify-between">
                <Button
                  mode="contained"
                  className="flex-1"
                  buttonColor={MD3Colors.error50}
                  textColor={MD3Colors.neutral100}
                  onPress={() => {
                    setVisibleActionModal(false), setVisibleRemoveModal(true);
                  }}
                >
                  Apagar
                </Button>

                <Button
                  mode="contained-tonal"
                  className="flex-1"
                  buttonColor={MD3Colors.secondary60}
                  textColor={MD3Colors.neutral100}
                >
                  <Link
                    href={{
                      pathname: "/form",
                      params: { id },
                    }}
                  >
                    Editar
                  </Link>
                </Button>

                <Button
                  mode="contained"
                  className="flex-1"
                >
                  Enviar
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={visibleRemoveModal}
          onDismiss={() => setVisibleRemoveModal(false)}
        >
          <View className="bg-white mx-4 rounded-md gap-4">
            <View className="bg-red-700 rounded-t-md flex-row justify-between items-center px-4">
              <Text className="text-white text-lg font-bold">Confirmação</Text>
              <IconButton
                icon="close"
                size={24}
                onPress={() => setVisibleRemoveModal(false)}
                iconColor="white"
              />
            </View>
            <View className="px-4 pb-8 gap-4">
              <Text className="text-xl font-semibold">Você tem certeza?</Text>
              <Divider />
              <View className="flex-row gap-8 justify-between">
                <Button
                  mode="outlined"
                  className="flex-1"
                  onPress={() => setVisibleRemoveModal(false)}
                >
                  Não
                </Button>
                <Button
                  mode="contained"
                  className="flex-1"
                  buttonColor={MD3Colors.error50}
                  textColor={MD3Colors.neutral100}
                  onPress={handleRemoveInterview}
                >
                  Sim
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default InterviewCard;
