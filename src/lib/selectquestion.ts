import { question } from "../data/question";

export const selectQuestion = (num: number) => {
  const shuffled = question.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, num);
};
