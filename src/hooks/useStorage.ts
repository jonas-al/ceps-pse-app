import AsyncStorage from "@react-native-async-storage/async-storage";

import { Models } from "@/src/@types";

const useStorage = () => {
  const getAll = async (key: string) => {
    try {
      const item = await AsyncStorage.getItem(key);

      if (item) return JSON.parse(item);

      return [];
    } catch (error) {
      return console.log("ERRO AO BUSCAR ITEMS ", error);
    }
  };

  const getById = async (key: string, id: number) => {
    try {
      const item = await AsyncStorage.getItem(key);

      if (item) return JSON.parse(item)[id];

      return [];
    } catch (error) {
      return console.log("ERRO AO BUSCAR ITEM ", error);
    }
  };

  const save = async (key: string, value: any) => {
    try {
      const interviews = await getAll(key);
      interviews.unshift(value)

      await AsyncStorage.setItem(key, JSON.stringify(interviews));
    } catch (error) {
      return console.log("ERRO AO SALVAR ITEM ", error);
    }
  };

  const update = async (key: string, value: any, id: number) => {
    try {
      const interviews = await getAll(key);

      if (interviews) {
        interviews[id] = value

        await AsyncStorage.setItem(key, JSON.stringify(interviews));
      };
    } catch (error) {
      return console.log("ERRO AO ATUALIZAR ITEM ", error);
    }
  }

  const remove = async (key: string, item: Models.Interview) => {
    try {
      const interviews = await getAll(key);
      const currentInterviews: Models.Interview[] = interviews.filter(
        (interview: Models.Interview) => JSON.stringify(interview) !== JSON.stringify(item)
      );

      await AsyncStorage.setItem(key, JSON.stringify(currentInterviews));

      return currentInterviews;
    } catch (error) {
      return console.log("ERRO AO REMOVER ITEM ", error);
    }
  };

  return {
    getAll,
    getById,
    save,
    update,
    remove,
  };
};

export default useStorage;
