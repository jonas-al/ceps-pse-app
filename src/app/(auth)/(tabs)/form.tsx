import { useState, useRef, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useForm,
  Controller,
  Control,
  UseFormHandleSubmit,
  FieldValues,
  FieldErrors,
  UseFormReset,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";

// Components
import {
  TextInput,
  RadioButton,
  Button,
  HelperText,
  Divider,
  ProgressBar,
} from "react-native-paper";
import InterviewFormInputs from "@/src/components/interview-form-inputs";
import CandidateConfirmationModal from "@/src/components/candidate-confirmation-modal";
import InterviewSummary from "@/src/components/interview-summary";

// Questions
import { FormQuestions } from "@/constants/Questions";

// Hooks
import useStorage from "@/src/hooks/useStorage";

const MockedCandidate = [
  {
    "nome-candidato": "Fulano",
    "numero-inscricao": "123",
    "local-entrevista": "Belém",
    selecao: "Quilombola",
  },
  {
    "nome-candidato": "Persona",
    "numero-inscricao": "456",
    "local-entrevista": "Altamira",
    selecao: "Indígina",
  },
  {
    "nome-candidato": "Tal",
    "numero-inscricao": "789",
    "local-entrevista": "Ananideua",
    selecao: "Indígina",
  },
];

export default function Form() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  const [formStep, setFormStep] = useState(0);
  const lastStep = Object.keys(FormQuestions).length;

  const ref = useRef<ScrollView>(null);
  const [visible, setVisible] = useState(false);
  const [scores, setScores] = useState<{
    [k: string]: { [k: string]: number };
  }>({});

  const { id } = useLocalSearchParams<{ id: string }>();

  const { getById, save, update } = useStorage();

  const onSubmit = (data: any) => {
    if (formStep === 0) {
      setVisible(true);
      return;
    } else if (formStep === lastStep) {
      // Inserido os valores das pontuações na estrutura
      let acc = 0;
      for (const key of Object.keys(scores)) {
        Object.keys(scores[key]).map((scoreField) => {
          if (!!data[scoreField]) {
            scores[key][scoreField] = data[scoreField];
            acc += Number(data[scoreField]);
          }
        });
      }
      setValue("pontuacao-total", acc);
    }

    setFormStep(formStep + 1);
  };

  const onSave = async (data: any) => {
    if (id) {
      await update("@interviews", data, Number(id));
    } else {
      await save("@interviews", data);
      await save("@registrations", data["numero-inscricao"]);
    }

    router.push("/saved-interviews");
  };

  const onError = (data: any) => {
    console.log("🚀 ~ onError ~ data:", data);
  };

  const handleCandidate = (registration: string) => {
    const candidate = MockedCandidate.filter(
      (candidate) => candidate["numero-inscricao"] === registration
    )[0];

    if (candidate) {
      reset(candidate);
    } else
      reset({
        "nome-candidato": "",
        "numero-inscricao": "",
        "local-entrevista": "",
        selecao: "",
      });
  };

  useEffect(() => {
    if (id) {
      const getInterview = async () => {
        return await getById("@interviews", Number(id));
      };

      getInterview().then((_interview) => reset(_interview));
    }

    // Definindo a estrura das pontuações
    const _scores: { [k: string]: { [k: string]: number } } = {};
    for (const question of Object.values(FormQuestions)) {
      if (question.punctuation?.length)
        question.punctuation.map((score) => {
          _scores[question.category] = {
            ..._scores[question.category],
            [score.field]: 0,
          };
        });
    }

    setScores(_scores);
  }, []);

  useEffect(() => {
    ref.current?.scrollTo({ x: 0, y: 0, animated: false });
  }, [formStep]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        className="flex-1"
        ref={ref}
      >
        {formStep <= lastStep ? (
          <View className="flex-1 min-h-[calc(100vh-10vh)] pt-6 pb-4 px-7 gap-4">
            <ProgressBar progress={formStep / lastStep} />
            <InterviewFormInputs
              formStep={formStep}
              handleSubmit={handleSubmit}
              watch={watch}
              setValue={setValue}
              onSubmit={onSubmit}
              onError={onError}
              prevStep={() => setFormStep(formStep - 1)}
              handleCandidate={handleCandidate}
              control={control}
              errors={errors}
            />
          </View>
        ) : (
          <InterviewSummary
            answers={watch()}
            scores={scores}
            prevStep={() => setFormStep(formStep - 1)}
            save={handleSubmit(onSave)}
          />
        )}
        <CandidateConfirmationModal
          name={watch("nome-candidato")}
          registration={watch("numero-inscricao")}
          visible={visible}
          close={() => setVisible(false)}
          nextStep={() => {
            setFormStep(formStep + 1), setVisible(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
