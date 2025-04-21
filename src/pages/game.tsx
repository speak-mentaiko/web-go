import { TextField } from "@mui/material";
import { useState } from "react";
import { GameManager } from "../lib/gameManager";
import { useNavigate } from "react-router-dom";
import { useTimer } from "../hooks/useTimer";

export const Game = () => {
  const navigate = useNavigate();
  const { time, resetTimer } = useTimer(10, () => {
    timeOut();
  });

  const [ans, setAns] = useState("");
  const [gameManager] = useState(new GameManager(10));

  const checkAnswer = () => {
    if (gameManager.checkAnswer(ans)) {
      console.log("正解");
      moveToNext();
    }
    setAns("");
  };

  const timeOut = () => {
    if (gameManager.checkAnswer(ans)) {
      console.log("正解");
    }
    moveToNext();
  };

  const moveToNext = () => {
    if (gameManager.isFinished()) navigate("/result");
    gameManager.nextQuestion();
    resetTimer();
    setAns("");
  };

  return (
    <>
      <h1>Game</h1>
      <p>{gameManager.getQuestion()}</p>
      <p>{time}</p>
      <TextField
        variant="standard"
        label="答えを入力"
        value={ans}
        onChange={(e) => setAns(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            checkAnswer();
          }
        }}
      />
    </>
  );
};
