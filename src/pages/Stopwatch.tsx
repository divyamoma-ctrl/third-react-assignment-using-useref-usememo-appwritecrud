

import { useState, useEffect, useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import StopwatchCard from "../components/StopwatchCard";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    console.log("Starting...");

    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime; // currentTime  - 0
    // console.log(" startTimeRef.current:",  startTimeRef.current);// give milisec
  };
// Date now()= 17135678.... something like that 1970 1st january to now in milisec
  const handlePause = () => {
    console.log("Pausing...");

    setIsRunning(false);
  };

  const handleReset = () => {
    console.log("Resetting...");

    setElapsedTime(0);
    setIsRunning(false);
  };

  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const centiseconds = Math.floor((elapsedTime % 1000) / 10);

  const formatTime = (value: number) => {
    return String(value).padStart(2, "0");
  };

  const formattedTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(centiseconds)}`;

  return (
    <Box sx={{ py: { xs: 1, md: 4 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" sx={{ mt: 1, mb: 1 }}>
            Stopwatch & Timer
          </Typography>

          <Typography color="text.secondary">
            Track your elapsed time.
          </Typography>
        </Box>

        <StopwatchCard
          time={formattedTime}
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />
      </Container>
    </Box>
  );
};

export default Stopwatch;
