import { questions } from "../data/question";
import { Question } from "../types/question";

type Phase = "question" | "finished";

/**
 * ゲームの進行を管理するクラス
 */
export class GameManager {
  questions: Question[];
  questionsIndex: number;
  questionsState: Map<Question, boolean | null>;
  gamePhase: Phase;

  /**
   *
   * @param questionCount 出題する問題数
   */
  constructor(questionCount: number) {
    this.questions = this._selectQuestions(questionCount);
    this.questionsIndex = 0;
    this.questionsState = new Map(
      new Map(this.questions.map((key) => [key, null]))
    );
    this.gamePhase = "question";
  }

  /**
   * @param num 問題数
   * @returns 選ばれた問題の配列
   */
  _selectQuestions = (num: number) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
  };

  /**
   * @param str 変換したい文字列
   * @returns 変換された文字列
   */
  _convertToHiragana = (str: string) => {
    return str.replace(/[\u30a1-\u30f6]/g, (match) => {
      const chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
  };

  /**
   * @param input ユーザーが入力した答え
   * @returns
   */
  checkAnswer = (input: string) => {
    const question = this.questions[this.questionsIndex];

    const convertedInput = this._convertToHiragana(input);
    const convertedAnswer = this._convertToHiragana(question.answer);

    const isCorrect = convertedInput === convertedAnswer;

    this.questionsState.set(this.questions[this.questionsIndex], isCorrect);

    isCorrect ? (this.gamePhase = "finished") : (this.gamePhase = "question");

    return isCorrect;
  };

  getQuestion = () => {
    return this.questions[this.questionsIndex].question;
  };

  getAnswer = () => {
    return this.questions[this.questionsIndex].answer;
  };

  getQuestionsState = () => {
    return this.questionsState;
  };

  getPhase = () => {
    return this.gamePhase;
  };

  setPhase = (phase: Phase) => {
    this.gamePhase = phase;
  };

  nextQuestion = () => {
    this.questionsIndex++;
  };

  isFinished = () => {
    return this.questionsIndex + 1 >= this.questions.length;
  };

  isCurrent = () => {
    return this.questionsState.get(this.questions[this.questionsIndex]);
  };
}
