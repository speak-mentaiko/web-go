import { Link } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Question } from "../types/question";

export const Result = () => {
  const answerState = useLocation();

  const correctsState: Map<Question, boolean | null> =
    answerState.state.correctsState;
  const entries = Array.from(correctsState.entries());

  console.log(answerState.state.correctsState.values());

  return (
    <>
      <p>Result</p>
      <ul>
        {entries.map(([question, value]) => {
          return (
            <li>
              問題：{question.question} 答え：{question.answer} 正誤：
              {value ? "正解" : "不正解"}
            </li>
          );
        })}
      </ul>
      <Link href="/">home</Link>
      <Link href="/game">game</Link>
    </>
  );
};
