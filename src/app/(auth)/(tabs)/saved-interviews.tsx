import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB } from "react-native-paper";

import { Models } from "@/src/@types";

// Components
import InterviewCard from "@/src/components/interview-card";

// Hooks
import useStorage from "@/src/hooks/useStorage";

const SavedInterviews = () => {
  const { getAll } = useStorage();
  const [interviews, setInterviews] = useState<Models.Interview[]>([]);

  useEffect(() => {
    const getSavedInterviews = async () => {
      return await getAll("@interviews");
    };

    const promise = getSavedInterviews();

    promise.then((_interviews) => setInterviews(_interviews));
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 12,
      }}
    >
      {!!interviews.length ? (
        <View className="flex-1 gap-4 px-4">
          {interviews.map((interview, index) => (
            <InterviewCard
              key={index}
              interview={interview}
              setInterviews={setInterviews}
              id={index}
            />
          ))}
        </View>
      ) : (
        <View className="flex-1 gap-4 p-4 items-center justify-center">
          <Text className="text-xl font-semibold text-center">
            Não foi encontrado nenhuma estrevista
          </Text>
        </View>
      )}
      <View className="flex flex-row items-center justify-center gap-4 absolute right-0 bottom-0 m-4">
        <Text className="font-semibold">Salvar todas</Text>
        <FAB
          icon="cloud-upload"
          size="medium"
          color="white"
          className="rounded-lg bg-slate-400 shadow-sm"
        />
      </View>
    </SafeAreaView>
  );
};

export default SavedInterviews;
