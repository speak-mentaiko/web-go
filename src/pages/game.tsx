import { TextField } from "@mui/material";
import { useState } from "react";
import { GameManager } from "../lib/gameManager";
import { useNavigate } from "react-router-dom";
import { useTimer } from "../hooks/useTimer";

type Phase = "question" | "finished";

export const Game = () => {
  const navigate = useNavigate();
  const { time, resetTimer, stopTimer } = useTimer(10, () => {
    timeOut();
  });

  const [ans, setAns] = useState("");
  const [phase, setPhase] = useState<Phase>("question");
  const [gameManager] = useState(new GameManager(10));

  const checkAnswer = () => {
    if (gameManager.checkAnswer(ans)) {
      console.log("正解");
      setPhase("finished");
      stopTimer();
    }
    setAns("");
  };

  const timeOut = () => {
    if (gameManager.checkAnswer(ans)) {
      console.log("正解");
    }
    setPhase("finished");
    stopTimer();
  };

  const moveToNext = () => {
    if (gameManager.isFinished()) navigate("/result");
    gameManager.nextQuestion();

    resetTimer();
    setAns("");
    setPhase("question");
  };

  return (
    <>
      <h1>Game</h1>
      <p>{gameManager.getQuestion()}</p>
      <p>{phase}</p>
      <p>{time}</p>
      <TextField
        variant="standard"
        label="答えを入力"
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
