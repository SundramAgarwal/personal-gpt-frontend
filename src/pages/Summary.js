import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Summary = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px");

  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false); // New state to control Collapse visibility
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/openAi/summary`,
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
          SIGH IN
        </Button>
        <Typography mt={2}>
          Not this tool ? <Link to="/">Go Back</Link>
        </Typography>
      </form>
      {summary} ? (
      <Card>
        <CardContent>{summary}</CardContent>
      </Card>
      )
    </Box>
  );
};

export default Summary;
