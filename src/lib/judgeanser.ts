import { Question } from "../types/question";

const convertToHiragana = (str: string) => {
  return str.replace(/[\u30a1-\u30f6]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
};

export const judgeAnswer = (question: Question, answer: string) => {
  if (answer === "") return false;
  if (convertToHiragana(answer) == question.answer) return true;
  return false;
};
