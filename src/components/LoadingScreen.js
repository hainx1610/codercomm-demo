import { Box, CircularProgress } from "@mui/material";
import React from "react";

function LoadingScreen() {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingScreen;
