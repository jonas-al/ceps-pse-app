import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthentication = () => {
  const getUser = async () => {
    try {
      const item = await AsyncStorage.getItem("@user");

      if (item) return JSON.parse(item);

      return [];
    } catch (error) {
      return console.log("ERRO AO BUSCAR USUÄRIO ", error);
    }
  };

  const login = async (value: any) => {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify([value]));

      return await getUser()
    } catch (error) {
      return console.log("ERRO AO REALIZAR LOGIN", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@user");
    } catch (error) {
      return console.log("ERRO AO REALIZAR LOGOUT", error);
    }
  }

  return {
    getUser,
    login,
    logout
  };
}

export default useAuthentication;