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
   * @param {number} num 出題する問題数
   */
  constructor(num: number) {
    this.questions = this.selectQuestions(num);
    this.currentIndex = 0;
  }

  /**
   *
   * @param {number} num 問題数
   * @returns {Question[]} 選ばれた問題の配列
   */
  selectQuestions = (num: number) => {
    const shuffled = [...question].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
  };

  /**
   *
   * @param {string} input ユーザーが入力した答え
   * @returns {boolean}
   */
  checkAnswer = (input: string) => {
    const question = this.questions[this.currentIndex];
    if (this.convertToHiragana(input) === question.answer) return true;
    return false;
  };

  /**
   *
   * @param {string} str 変換したい文字列
   * @returns {string} 変換された文字列
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

  nextQuestion = () => {
    this.currentIndex++;
  };

  isFinished = () => {
    return this.currentIndex + 1 >= this.questions.length;
  };
}
