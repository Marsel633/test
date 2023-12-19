import axios from "axios";
import { defineStore } from "pinia";

export const useContributionStore = defineStore("getData", () => {
  const conData = ref<{ [key: string]: number }>({});
  const getData = async () => {
    try {
      const { data } = await axios.get("https://dpg.gg/test/calendar.json");
      conData.value = data;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getData,
    conData
  }
});
