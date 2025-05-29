import { TextField } from "@mui/material";
import { useState } from "react";
import { GameManager } from "../lib/gameManager";
import { useNavigate } from "react-router-dom";
import { useTimer } from "../hooks/useTimer";
import { Question } from "../types/question";

type Phase = "question" | "finished";

export const Game = () => {
  const TIME_LIMIT = 15;
  const QUESTION_NUM = 10;

  const navigate = useNavigate();
  const { time, resetTimer, stopTimer } = useTimer(TIME_LIMIT, () => timeOut());

  const [gameManager] = useState(new GameManager(QUESTION_NUM));
  const [ans, setAns] = useState("");
  const [phase, setPhase] = useState<Phase>("question");

  const questions = gameManager.questions;
  const [correctsState] = useState(
    new Map<Question, boolean | null>(
      new Map(questions.map((key) => [key, null]))
    )
  );

  const checkAnswer = () => {
    if (gameManager.checkAnswer(ans)) {
      correctsState.set(questions[gameManager.currentIndex], true);
      setPhase("finished");
      stopTimer();
    }
    setAns("");
  };

  const timeOut = () => {
    if (gameManager.checkAnswer(ans)) {
      correctsState.set(questions[gameManager.currentIndex], true);
    } else {
      correctsState.set(questions[gameManager.currentIndex], false);
    }
    setPhase("finished");
    stopTimer();
    setAns("");
  };

  const moveToNext = () => {
    if (gameManager.isFinished()) {
      navigate("/result", {
        state: {
          correctsState: correctsState,
        },
      });
    }
    gameManager.nextQuestion();

    resetTimer();
    setPhase("question");
  };

  console.log(correctsState);
  console.log(correctsState.get(questions[gameManager.currentIndex]));

  return (
    <>
      <h1>Game</h1>
      <p>{gameManager.getQuestion()}</p>
      {phase === "finished" ? (
        <>
          <p>{gameManager.getAnswer()}</p>
          <p>
            {correctsState.get(questions[gameManager.currentIndex])
              ? "正解"
              : "不正解"}
          </p>
        </>
      ) : (
        <p>{time}</p>
      )}
      <TextField
        variant="standard"
        autoComplete="off"
        label={phase === "question" ? "答えを入力" : "次の問題へ"}
        value={ans}
        onChange={(e) => setAns(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            if (phase === "question") {
              checkAnswer();
            } else {
              moveToNext();
            }
          }
        }}
      />
    </>
  );
};
