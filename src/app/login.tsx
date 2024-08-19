import { useContext } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";

// Components
import { TextInput, HelperText, Button } from "react-native-paper";

// Contexts
import AuthContext from "@/src/contexts/auth";

// Colors
import { colors } from "@/src/styles/colors";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email1: "",
      email2: "",
    },
  });

  const { Login } = useContext(AuthContext);

  const onSubmit = async (data: any) => {
    await Login(data);

    router.dismissAll();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.brown[500],
      }}
    >
      <View className="flex-1 mt-24 pt-8 pb-4 px-7 gap-4 bg-white rounded-t-3xl justify-between">
        <View>
          <View>
            <Text className="text-lg font-medium">
              {"Informe o primeiro email"}
            </Text>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: "Campo obrigatório" },
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                  message: "Email inválido",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <TextInput
                    label={"Primeiro email"}
                    mode="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors["email1"]}
                    right={<TextInput.Icon icon="at" />}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <HelperText
                    type="error"
                    visible={!!errors["email1"]}
                  >
                    {errors["email1"]?.message}
                  </HelperText>
                </View>
              )}
              name={"email1"}
            />
          </View>
          <View>
            <Text className="text-lg font-medium">
              {"Informe o segundo email"}
            </Text>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: "Campo obrigatório" },
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                  message: "Email inválido",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <TextInput
                    label={"Segundo email"}
                    mode="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors["email2"]}
                    right={<TextInput.Icon icon="at" />}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <HelperText
                    type="error"
                    visible={!!errors["email2"]}
                  >
                    {errors["email2"]?.message}
                  </HelperText>
                </View>
              )}
              name={"email2"}
            />
          </View>
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Entrar
        </Button>
      </View>
    </SafeAreaView>
  );
}
