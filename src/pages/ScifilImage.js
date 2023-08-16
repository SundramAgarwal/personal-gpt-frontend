import React, { useState } from "react";
import { Link } from "react-router-dom";
// import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
} from "@mui/material";

const ScifiImage = () => {
  const theme = useTheme();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  // const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  //register ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/openai/scifi-image`,
        { text }
      );
      console.log(data);
      setImage(data);
    } catch (err) {
      console.log(error);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
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
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      {loggedIn ? (
        <>
          <form onSubmit={handleSubmit}>
            <Typography variant="h3">Sci-fi Image</Typography>

            <TextField
              placeholder="add your text"
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
              Generate
            </Button>
            <Typography mt={2}>
              not this tool ? <Link to="/">GO BACK</Link>
            </Typography>
          </form>

          {image ? (
            <Card
              sx={{
                mt: 4,
                border: 1,
                boxShadow: 0,
                height: "500px",
                borderRadius: 5,
                borderColor: "natural.medium",
                bgcolor: "background.default",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
                <img src={image} alt="scifiimage" />
              </Box>
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
                bgcolor: "background.default",
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
                Your Sci-fi Image Will Appear Here
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

export default ScifiImage;
