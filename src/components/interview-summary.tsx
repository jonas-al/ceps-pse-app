import { Text, View } from "react-native";
import React from "react";

// Components
import { TextInput, Button, Divider, List } from "react-native-paper";

// Questions
import { FormQuestions } from "@/constants/Questions";

type InterviewSummary = {
  scores: {
    [k: string]: { [k: string]: number };
  };
  answers: any;
  prevStep: () => void;
  save: () => void;
};

const InterviewSummary = ({
  scores,
  answers,
  prevStep,
  save,
}: InterviewSummary) => {
  return (
    <View className="flex-1 min-h-[calc(100vh-10vh)] justify-between pb-4">
      <View>
        <View className="flex flex-col gap-8">
          <Text className="text-2xl font-semibold px-4">Confirmação</Text>
          <View className="flex flex-col items-center justify-center">
            <View className="flex justify-center items-center w-[75px] h-[75px] p-4 bg-brown-300 rounded-full">
              <Text className="text-3xl font-bold text-white">
                {answers["pontuacao-total"]}
              </Text>
            </View>
            <View>
              <Text className="text-xl font-regular">Pontuação total</Text>
            </View>
          </View>
        </View>
        <List.Section>
          {Object.entries(FormQuestions).map(([key, value], index) => {
            return (
              <List.Accordion
                title={
                  value.category !== "Informações candidato (a)" ? (
                    <View className="flex flex-col justify-between">
                      <Text>{value.category} </Text>
                      <Text className="font-bold text-brown-500">
                        {Object.values(scores[value.category])
                          .reduce((acc, cv) => Number(acc) + Number(cv))
                          .toFixed(1)}{" "}
                        pts
                      </Text>
                    </View>
                  ) : (
                    value.category
                  )
                }
                key={index}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="view-list"
                  />
                )}
              >
                <View className="px-7">
                  {value.questions.map((question, index) => (
                    <View
                      className="gap-1"
                      key={index}
                    >
                      <TextInput
                        label={question.question}
                        mode="outlined"
                        value={answers[question.field]}
                        multiline
                        readOnly
                      />
                    </View>
                  ))}
                  {!!value.punctuation?.length && (
                    <View>
                      <Divider
                        bold
                        className="mb-6"
                      />
                      <Text className="text-2xl font-semibold">Pontuação</Text>
                      {value.punctuation?.map((pontuation, index) => (
                        <View
                          className="gap-1"
                          key={index}
                        >
                          <Text className="text-lg font-medium">
                            {pontuation.question}
                          </Text>
                          <TextInput
                            label={pontuation.question}
                            placeholder={pontuation.placeholder}
                            value={answers[pontuation.field]}
                            readOnly
                          />
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </List.Accordion>
            );
          })}
        </List.Section>
      </View>
      <View className="flex flex-row px-4 gap-2">
        <Button
          mode="outlined"
          onPress={prevStep}
          className="flex-1"
        >
          Voltar
        </Button>
        <Button
          mode="contained"
          onPress={save}
          className="flex-1"
        >
          Salvar
        </Button>
      </View>
    </View>
  );
};

export default InterviewSummary;
