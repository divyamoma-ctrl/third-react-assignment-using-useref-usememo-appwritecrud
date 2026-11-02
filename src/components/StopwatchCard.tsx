
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import {
  Play,
  Pause,
  RotateCcw,
  Timer,
} from "lucide-react";

interface Props {
  time: string;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const StopwatchCard = ({
  time,
  isRunning,
  onStart,
  onPause,
  onReset,
}: Props) => {
  return (
    <Card
      sx={{
        maxWidth: 520,
        width: "100%",
        mx: "auto",
        overflow: "hidden",
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          bgcolor: "primary.dark",
          color: "white",
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: "secondary.main",
            width: 48,
            height: 48,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Timer size={26} />
        </Box>

        <Box>
          <Typography variant="h6">
            Stopwatch
          </Typography>

          <Typography variant="body2" sx={{ color: "#D0CBE0" }}>
            Track your time
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        {/* Timer Display */}
        <Box
          sx={{
            bgcolor: "background.default",
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
            py: 5,
            px: 2,
            textAlign: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ letterSpacing: 2 }}
          >
            ELAPSED TIME
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem" },
              fontWeight: 800,
              color: "primary.dark",
              letterSpacing: 2,
              fontVariantNumeric: "tabular-nums",
              mt: 1,
            }}
          >
            {time}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            {isRunning ? "Stopwatch is running" : "Stopwatch is paused"}
          </Typography>
        </Box>

        {/* Controls */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
        >
          <Button
            variant="contained"
            fullWidth
            startIcon={isRunning ? <Pause size={18} /> : <Play size={18} />}
            onClick={isRunning ? onPause : onStart}
          >
            {isRunning ? "Pause" : "Start"}
          </Button>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<RotateCcw size={18} />}
            onClick={onReset}
          >
            Reset
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default StopwatchCard;
