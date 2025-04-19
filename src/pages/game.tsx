import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { judgeAnswer } from "../lib/judgeanser";
import { selectQuestion } from "../lib/selectquestion";

export const Game = () => {
  const [ans, setAns] = useState("");
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(10);

  const [questions] = useState(selectQuestion(10));
  const [question, setQuestion] = useState(questions[0]);

  const reset = () => {
    setCount(count + 1);
    setTime(10);
    setQuestion(questions[count + 1]);
  };

  useEffect(() => {
    if (time <= 0) {
      judgeAnswer(question, ans);
      reset();
    } else {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <>
      <h1>Game</h1>
      <p>{question.question}</p>
      <p>{time}</p>
      <TextField
        variant="standard"
        label="答えを入力"
        value={ans}
        onChange={(e) => setAns(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            judgeAnswer(question, ans);
            reset();
          }
        }}
      />
    </>
  );
};
