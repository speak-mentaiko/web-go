import { TextField } from "@mui/material";
import { useState } from "react";
import { GameManager } from "../lib/gameManager";
import { useNavigate } from "react-router-dom";
import { useTimer } from "../hooks/useTimer";

export const Game = () => {
  const TIME_LIMIT = 30;
  const QUESTION_NUM = 10;

  const navigate = useNavigate();
  const { time, resetTimer, stopTimer } = useTimer(TIME_LIMIT, () => timeOut());

  const [gameManager] = useState<GameManager>(new GameManager(QUESTION_NUM));
  const [ans, setAns] = useState("");

  const phase = gameManager.getPhase();

  const checkAnswer = () => {
    if (gameManager.checkAnswer(ans)) {
      stopTimer();
    }
    setAns("");
  };

  const timeOut = () => {
    gameManager.setPhase("finished");
    stopTimer();
    setAns("");
  };

  const moveToNext = () => {
    if (gameManager.isFinished()) {
      navigate("/result", {
        state: {
          correctsState: gameManager.getQuestionsState(),
        },
      });
    }
    gameManager.nextQuestion();
    gameManager.setPhase("question");

    resetTimer();
  };

  return (
    <>
      <h1>Game</h1>
      <p>{gameManager.getQuestion()}</p>
      {phase === "finished" ? (
        <>
          <p>{gameManager.getAnswer()}</p>
          <p>{gameManager.isCurrent() ? "正解" : "不正解"}</p>
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
            void (phase === "question" ? checkAnswer() : moveToNext());
          }
        }}
      />
    </>
  );
};
