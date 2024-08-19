import { View, Text } from "react-native";
import {
  Controller,
  Control,
  UseFormHandleSubmit,
  FieldValues,
  FieldErrors,
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
} from "react-native-paper";
import MaskInput from "react-native-mask-input";

// Questions
import { FormQuestions } from "@/constants/Questions";

enum InputType {
  Text,
  Radio,
  TextWithRadio,
}

type QuestionsProps = {
  formStep: number;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  onSubmit: (data: any) => void;
  onError: (data: any) => void;
  prevStep: () => void;
  handleCandidate: (registration: string) => void;
  control: Control;
  errors: FieldErrors;
};

const InterviewFormInputs = ({
  formStep,
  handleSubmit,
  watch,
  setValue,
  onSubmit,
  onError,
  prevStep,
  handleCandidate,
  control,
  errors,
}: QuestionsProps) => {
  return (
    <View>
      {formStep === 0 && (
        <View className="flex-1 gap-20">
          <View>
            <Text className="text-2xl font-semibold">
              Informações canditato(a)
            </Text>
            <Text className="text-lg font-medium">
              Informe o número de inscrição
            </Text>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <TextInput
                    label={"Informe o número de inscrição"}
                    mode="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors["numero-inscricao"]}
                    keyboardType="numeric"
                  />
                  <HelperText
                    type="error"
                    visible={!!errors["numero-inscricao"]}
                  >
                    Campo obrigatório
                  </HelperText>
                  <Button
                    mode="contained"
                    onPress={() => handleCandidate(value)}
                  >
                    Buscar
                  </Button>
                </View>
              )}
              name={"numero-inscricao"}
            />
          </View>

          <View className="flex flex-col gap-4">
            <TextInput
              label={"Nome candidato(a)"}
              mode="outlined"
              value={watch("nome-candidato")}
              readOnly
            />
            <TextInput
              label={"Local da entrevista"}
              mode="outlined"
              value={watch("local-entrevista")}
              readOnly
            />
            <TextInput
              label={"Seleção"}
              mode="outlined"
              value={watch("selecao")}
              readOnly
            />

            <Button
              className="flex-1"
              mode="contained"
              onPress={handleSubmit(onSubmit, onError)}
            >
              Prosseguir
            </Button>
          </View>
        </View>
      )}
      {Object.entries(FormQuestions).map(([key, value], index) => {
        return key === String(formStep) ? (
          <View
            className="flex-1"
            key={index}
          >
            <Text className="text-2xl font-semibold">
              {`${key}.`} {value.category}
            </Text>

            {value.questions.map((question, index) => (
              <View
                className="gap-1"
                key={index}
              >
                <View>
                  <Text className="text-lg font-medium">
                    {question.question}
                  </Text>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <View>
                        {question.inputType === InputType.Text && (
                          <TextInput
                            label={question.question}
                            mode="outlined"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={!!errors[question.field]}
                            multiline
                            readOnly={question.readOnly}
                          />
                        )}

                        {question.inputType === InputType.Radio && (
                          <RadioButton.Group
                            onValueChange={onChange}
                            value={value}
                          >
                            {question.options?.map((option, index) => (
                              <RadioButton.Item
                                label={option}
                                value={option}
                                key={index}
                                position="leading"
                                labelStyle={{
                                  textAlign: "left",
                                  marginLeft: 8,
                                }}
                              />
                            ))}
                          </RadioButton.Group>
                        )}

                        {question.inputType === InputType.TextWithRadio && (
                          <View>
                            <View>
                              <Text className="text-lg font-medium">
                                {question.question}
                              </Text>
                              <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                  <View>
                                    <RadioButton.Group
                                      onValueChange={(value) => {
                                        onChange(value),
                                          value === "Sim"
                                            ? setValue(question.field, "")
                                            : setValue(question.field, "Não");
                                      }}
                                      value={value}
                                    >
                                      {question.options?.map(
                                        (option, index) => (
                                          <RadioButton.Item
                                            label={option}
                                            value={option}
                                            key={index}
                                            position="leading"
                                            labelStyle={{
                                              textAlign: "left",
                                              marginLeft: 8,
                                            }}
                                          />
                                        )
                                      )}
                                    </RadioButton.Group>
                                    <HelperText
                                      type="error"
                                      visible={
                                        !!errors[`radio-${question.field}`]
                                      }
                                    >
                                      Selecione uma opção
                                    </HelperText>
                                  </View>
                                )}
                                name={`radio-${question.field}`}
                              />
                            </View>

                            {watch(`radio-${question.field}`) === "Sim" && (
                              <View>
                                <Controller
                                  control={control}
                                  rules={{ required: true }}
                                  render={({
                                    field: { onChange, onBlur, value },
                                  }) => (
                                    <View>
                                      <TextInput
                                        label="Qual?"
                                        mode="flat"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        error={!!errors[question.field]}
                                        multiline
                                      />
                                      <HelperText
                                        type="error"
                                        visible={!!errors[question.field]}
                                      >
                                        Campo obrigatório
                                      </HelperText>
                                    </View>
                                  )}
                                  name={question.field}
                                />
                              </View>
                            )}
                          </View>
                        )}

                        <HelperText
                          type="error"
                          visible={!!errors[question.field]}
                        >
                          Campo obrigatório
                        </HelperText>
                      </View>
                    )}
                    name={question.field}
                  />
                </View>
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

                    <Controller
                      control={control}
                      rules={{
                        required: "Campo obrigatório",
                        max: {
                          value: pontuation.maxPontuaction,
                          message: "Pontuação inválida",
                        },
                      }}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <View>
                          <TextInput
                            label={pontuation.question}
                            placeholder={pontuation.placeholder}
                            mode="outlined"
                            value={value}
                            onBlur={onBlur}
                            error={!!errors[pontuation.field]}
                            keyboardType="numeric"
                            maxLength={3}
                            render={(props) => (
                              <MaskInput
                                {...props}
                                value={value}
                                onChangeText={onChange}
                                mask={[/\d/, ".", /\d/, /\d/]}
                              />
                            )}
                          />
                          <HelperText
                            type="error"
                            visible={!!errors[pontuation.field]}
                          >
                            {error?.message}
                          </HelperText>
                        </View>
                      )}
                      name={pontuation.field}
                    />
                  </View>
                ))}
              </View>
            )}
            {/*ver as atualiazações nos inputs <Text>{JSON.stringify(watch(), null, 2)}</Text>*/}
            <View className="flex-row gap-2">
              {formStep > 0 && (
                <Button
                  className="flex-1"
                  mode="outlined"
                  onPress={prevStep}
                >
                  Voltar
                </Button>
              )}
              <Button
                className="flex-1"
                mode="contained"
                onPress={handleSubmit(onSubmit, onError)}
              >
                Prosseguir
              </Button>
            </View>
          </View>
        ) : null;
      })}
    </View>
  );
};

export default InterviewFormInputs;
