import { Link } from "@mui/material";
import { useEffect, useState } from "react";

export const Home = () => {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <>
      <h1>{count}秒</h1>
      <Link href="/game">game</Link>
    </>
  );
};
