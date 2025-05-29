import { question } from "../data/question";
import { Question } from "../types/question";

/**
 * ゲームの進行を管理するクラス
 */
export class GameManager {
  questions: Question[];
  currentIndex: number;

  /**
   *
   * @param questionCount 出題する問題数
   */
  constructor(questionCount: number) {
    this.questions = this.selectQuestions(questionCount);
    this.currentIndex = 0;
  }

  /**
   *
   * @param num 問題数
   * @returns 選ばれた問題の配列
   */
  selectQuestions = (num: number) => {
    const shuffled = [...question].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
  };

  /**
   *
   * @param input ユーザーが入力した答え
   * @returns
   */
  checkAnswer = (input: string) => {
    const question = this.questions[this.currentIndex];

    const convertedInput = this.convertToHiragana(input);
    const convertedAnswer = this.convertToHiragana(question.answer);

    if (convertedInput === convertedAnswer) return true;
    return false;
  };

  /**
   *
   * @param str 変換したい文字列
   * @returns 変換された文字列
   */
  convertToHiragana = (str: string) => {
    return str.replace(/[\u30a1-\u30f6]/g, (match) => {
      const chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
  };

  getQuestion = () => {
    return this.questions[this.currentIndex].question;
  };

  getAnswer = () => {
    return this.questions[this.currentIndex].answer;
  };

  nextQuestion = () => {
    this.currentIndex++;
  };

  isFinished = () => {
    return this.currentIndex + 1 >= this.questions.length;
  };
}
