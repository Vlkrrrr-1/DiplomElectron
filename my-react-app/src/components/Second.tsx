import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Second = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(135deg, rgb(21, 21, 33) 100%, rgb(74, 74, 110) 0%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          textAlign: "center",
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
          }}
        >
          Thank you for using our program!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#d3d3d3",
            fontSize: "1.3rem",
            marginBottom: 4,
          }}
        >
          Below you can find all the information about your PC.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#d3d3d3",
            fontSize: "2rem",
            lineHeight: 1.6,
          }}
        >
          <a
            href="http://localhost:3000"
            style={{
              color: "#d3d3d3",
              fontSize: "2rem",
            }}
          >
            NodeSysMon
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Second;
