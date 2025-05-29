import { Link } from "@mui/material";
import { useLocation } from "react-router-dom";

export const Result = () => {
  const correctsState = useLocation();

  console.log(correctsState.state.correctsState);

  return (
    <>
      <p>Result</p>
      <Link href="/">home</Link>
      <Link href="/game">game</Link>
    </>
  );
};
