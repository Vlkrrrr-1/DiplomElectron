import { Box, Typography } from "@mui/material";
import React from "react";

const TransitionLogo = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, rgb(21, 21, 33) 100%, rgb(74, 74, 110) 0%)",
        zIndex: 10,
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: "bold",
          color: "common.white",
          fontSize: "3rem",
          marginBottom: 3,
          opacity: 0,
          transform: "scale(0.9)",
          animation: "fadeInScale 1.5s ease-out forwards",
          "@keyframes fadeInScale": {
            "0%": {
              opacity: 0,
              transform: "scale(0.9)",
            },
            "100%": {
              opacity: 1,
              transform: "scale(1)",
            },
          },
        }}
      >
        NodeSysMon
      </Typography>
    </Box>
  );
};

export default TransitionLogo;
