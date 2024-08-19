import { View, Text } from "react-native";

import { Button, Divider, Modal, Portal, IconButton } from "react-native-paper";

type CandidateConfirmationModalProps = {
  name: string;
  registration: string;
  visible: boolean;
  close: () => void;
  nextStep: () => void;
};

const CandidateConfirmationModal = ({
  name,
  registration,
  visible,
  close,
  nextStep,
}: CandidateConfirmationModalProps) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={close}
      >
        <View className="bg-white mx-4 rounded-md gap-4">
          <View className="bg-brown-800 rounded-t-md flex-row justify-between items-center px-4">
            <Text className="text-white text-lg font-bold">Confirmação</Text>
            <IconButton
              icon="close"
              size={24}
              onPress={close}
              iconColor="white"
            />
          </View>
          <View className="pb-8 gap-4">
            <View className="px-8 gap-4">
              <View>
                <View className="flex-row">
                  <Text className="text-lg font-medium">Nome: </Text>
                  <Text className="text-lg font-regular">{name}</Text>
                </View>
                <View className="flex-row">
                  <Text className="text-lg font-medium">Inscrição: </Text>
                  <Text className="text-lg font-regular">{registration}</Text>
                </View>
              </View>
            </View>
            <Divider />
            <View className="flex-row gap-4 px-8 justify-between">
              <Button
                mode="outlined"
                onPress={close}
                className="flex-1"
              >
                Corrigir
              </Button>
              <Button
                mode="contained"
                onPress={nextStep}
                className="flex-1"
              >
                Confirmar
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default CandidateConfirmationModal;
