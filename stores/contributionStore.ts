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

  const startDate: Date = new Date("2022-10-25");
  const endDate: Date = new Date("2023-10-25");
  const dates = ref<{ [key: string]: number }>({});
  const date: Date = new Date(startDate.getTime());
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  date.setDate(date.getDate() + 1);
  while (date < endDate) {
    const formattedDate = formatDate(date);
    dates.value[formattedDate] = 0;
    date.setDate(date.getDate() + 1);
  }

  const getColor = (number: number): string => {
    if (number < 1) return "defaultColor";
    if (number > 1 && number <= 9) return "low";
    if (number > 9 && number <= 19) return "medium";
    if (number > 20 && number <= 29) return "high";
    if (number > 29) return "highest";
    return "defaultColor";
  };

  const formatDateLong = (dateString: string | number): string => {
    const date = new Date(dateString.toString());
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("ru-RU", options).format(date);
  };


  const monthsArray: string[] = [
    "Апр.",
    "Май",
    "Июнь",
    "Июль",
    "Авг.",
    "Сент.",
    "Окт.",
    "Нояб.",
    "Дек.",
    "Янв.",
    "Февр.",
    "Март",
  ];

  const weeksArray: string[] = ["Пн", "Ср", "Пт"];
  return {
    getData,
    conData,
    dates,
    monthsArray,
    weeksArray,
    getColor,
    formatDateLong
  };
});
