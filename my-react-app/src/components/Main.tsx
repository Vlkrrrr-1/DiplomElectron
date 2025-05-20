import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [isAllow, setIsAllow] = useState<boolean>(false);

  const handleCloseApp = () => {
    window.electron.closeApp();
  };

  const handleGetCompInfo = async () => {
    setIsAllow(true);
  };

  const handleSentInfo = async () => {
    await window.electron.getCompInfo(email);
    navigate("/infoSent");
  };

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
          Welcome to Node System Monitoring!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#d3d3d3",
            fontSize: "1.3rem",
            marginBottom: 4,
          }}
        >
          With our program you can track your computer data, record it in
          history and much more.
        </Typography>

        {isAllow ? (
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#d3d3d3",
                fontSize: "1.1rem",
              }}
            >
              Enter your email to register and monitor your PC data:
            </Typography>
            <input
              type="text"
              placeholder="Email"
              style={{
                borderRadius: "6px",
                border: "1px solid #ccc",
                padding: "10px",
                fontSize: "20px",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              sx={{
                background: "rgb(13, 216, 26)",
                color: "#fff",
                fontSize: "20px",
              }}
              onClick={handleSentInfo}
            >
              Register
            </Button>
          </form>
        ) : (
          <>
            <Typography
              variant="body1"
              sx={{
                color: "#d3d3d3",
                fontSize: "1.1rem",
                marginBottom: 2,
              }}
            >
              We need your consent to access your PC data. Do you allow it?
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleGetCompInfo}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleCloseApp}
              >
                No
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Main;
