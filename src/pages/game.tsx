import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { GameManager } from "../lib/gamemanager";
import { useNavigate } from "react-router-dom";

export const Game = () => {
  const navigate = useNavigate();
  const [ans, setAns] = useState("");
  const [time, setTime] = useState(10);

  const [gameManager] = useState(new GameManager(10));

  const checkAnswer = () => {
    if (gameManager.checkAnswer(ans)) {
      console.log("正解");
    }
  };

  const reset = () => {
    if (gameManager.isFinished()) {
      navigate("/result");
    }
    gameManager.nextQuestion();
    setTime(10);
    setAns("");
  };

  useEffect(() => {
    if (time <= 0) {
      checkAnswer();
      reset();
    } else {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  console.log(gameManager.currentIndex);

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
            reset();
          }
        }}
      />
    </>
  );
};
