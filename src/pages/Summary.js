import {
  Alert,
  Box,
  Button,
  Card,
  Collapse,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Summary = () => {
  const theme = useTheme();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const isNotMobile = useMediaQuery("(min-width: 1000px");

  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false); // New state to control Collapse visibility
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/openai/summary`,
        { text }
      );
      setSummary(data);
    } catch (err) {
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setShowError(true); // Show the error Collapse
      setTimeout(() => {
        setError("");
        setShowError(false); // Hide the error Collapse after some time
      }, 5000);
    }
  };

  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={showError}>
        {" "}
        {/* Use the new state variable here */}
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      {loggedIn ? (
        <>
          <form onSubmit={handleSubmit}>
            <Typography variant="h2" textAlign={"center"}>
              Summarize Text
            </Typography>
            <TextField
              placeholder="Add your Text"
              type="text"
              multiline={true}
              required
              margin="normal"
              fullWidth
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ color: "white", mt: 2 }}
            >
              Summarize It
            </Button>
            <Typography mt={2}>
              Not this tool ? <Link to="/">Go Back</Link>
            </Typography>
          </form>
          {summary ? (
            <Card
              sx={{
                mt: 4,
                border: 1,
                boxShadow: 0,
                height: "500px",
                borderRadius: 5,
                borderColor: "natural.medium",
                bgColor: "background.default",
              }}
            >
              <Typography>{summary}</Typography>
            </Card>
          ) : (
            <Card
              sx={{
                mt: 4,
                border: 1,
                boxShadow: 0,
                height: "500px",
                borderRadius: 5,
                borderColor: "natural.medium",
                bgColor: "background.default",
              }}
            >
              <Typography
                variant="h5"
                color="natural.main"
                sx={{
                  textAlign: "center",
                  verticalAlign: "middle",
                  lineHeight: "450px",
                }}
              >
                Summary will Appear Here
              </Typography>
            </Card>
          )}
        </>
      ) : (
        <>
          <Box
            width={isNotMobile ? "40%" : "80%"}
            p={"2rem"}
            m={"2rem auto"}
            borderRadius={5}
            sx={{ boxShadow: 5 }}
            backgroundColor={theme.palette.background.alt}
            textAlign="center"
          >
            <Typography variant="h4" mb={2}>
              Please login to continue.
            </Typography>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="large"
              sx={{
                color: "white",
                animation: "blink 0.1s infinite alternate", // Faster blinking (0.5s)
                "@keyframes blink": {
                  "0%": { backgroundColor: "green" },
                  "100%": { backgroundColor: "darkgreen" },
                },
              }}
            >
              Login
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Summary;
