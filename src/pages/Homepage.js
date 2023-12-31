import React from "react";
import {
  Box,
  Typography,
  Card,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import FormatAlignLeftOutlined from "@mui/icons-material/FormatAlignLeftOutlined";
import ChatRounded from "@mui/icons-material/ChatRounded";

const Homepage = () => {
  const theme = useTheme();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const isNotMobile = useMediaQuery("(min-width: 1000px");
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        // flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center", // Center content vertically
        alignItems: "center", // Center content horizontally
        gap: "20px", // Add spacing between Card components
        "@media (max-width: 600px)": {
          // Apply styles for screens with max width of 768px
          // flexDirection: "column", // Change direction to horizontal
          flexWrap: "wrap",
        },
      }}
    >
      {loggedIn ? (
        <>
          <Box p={2}>
            <Typography variant="h4" mb={2} fontWeight="bold">
              Text Generation
            </Typography>
            <Card
              onClick={() => navigate("/summary")}
              sx={{
                boxShadow: 2,
                borderRadius: 5,
                height: 190,
                width: 200,
                "&:hover": {
                  border: 2,
                  boxShadow: 0,
                  borderColor: "primary.dark",
                  cursor: "pointer",
                },
              }}
            >
              <DescriptionRounded
                sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
              />
              <Stack p={3} pt={0}>
                <Typography fontWeight="bold" variant="h5">
                  TEXT SUMMARY
                </Typography>
                <Typography variant="h6">
                  Summarize long text into short sentences
                </Typography>
              </Stack>
            </Card>
          </Box>
          <Box p={2}>
            <Typography variant="h4" mb={2} fontWeight="bold">
              Paragraph Generation
            </Typography>
            <Card
              onClick={() => navigate("/paragraph")}
              sx={{
                boxShadow: 2,
                borderRadius: 5,
                height: 190,
                width: 200,
                "&:hover": {
                  border: 2,
                  boxShadow: 0,
                  borderColor: "primary.dark",
                  cursor: "pointer",
                },
              }}
            >
              <FormatAlignLeftOutlined
                sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
              />
              <Stack p={3} pt={0}>
                <Typography fontWeight="bold" variant="h5">
                  Paragraph
                </Typography>
                <Typography variant="h6">
                  Generate Paragraph with words
                </Typography>
              </Stack>
            </Card>
          </Box>
          <Box p={2}>
            <Typography variant="h4" mb={2} fontWeight="bold">
              AI ChatBot
            </Typography>
            <Card
              onClick={() => navigate("/chatbot")}
              sx={{
                boxShadow: 2,
                borderRadius: 5,
                height: 190,
                width: 200,
                "&:hover": {
                  border: 2,
                  boxShadow: 0,
                  borderColor: "primary.dark",
                  cursor: "pointer",
                },
              }}
            >
              <ChatRounded
                sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
              />
              <Stack p={3} pt={0}>
                <Typography fontWeight="bold" variant="h5">
                  Chatbot
                </Typography>
                <Typography variant="h6">Chat With AI Chatbot</Typography>
              </Stack>
            </Card>
          </Box>
          <Box p={2}>
            <Typography variant="h4" mb={2} fontWeight="bold">
              Javascript Converter
            </Typography>
            <Card
              onClick={() => navigate("/js-converter")}
              sx={{
                boxShadow: 2,
                borderRadius: 5,
                height: 190,
                width: 200,
                "&:hover": {
                  border: 2,
                  boxShadow: 0,
                  borderColor: "primary.dark",
                  cursor: "pointer",
                },
              }}
            >
              <ChatRounded
                sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
              />
              <Stack p={3} pt={0}>
                <Typography fontWeight="bold" variant="h5">
                  JS CONVERTER
                </Typography>
                <Typography variant="h6">
                  Translate english to javascript code
                </Typography>
              </Stack>
            </Card>
          </Box>
          <Box p={2}>
            <Typography variant="h4" mb={2} fontWeight="bold">
              AI SCI-FI Images
            </Typography>
            <Card
              onClick={() => navigate("/scifi-image")}
              sx={{
                boxShadow: 2,
                borderRadius: 5,
                height: 190,
                width: 200,
                "&:hover": {
                  border: 2,
                  boxShadow: 0,
                  borderColor: "primary.dark",
                  cursor: "pointer",
                },
              }}
            >
              <ChatRounded
                sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
              />
              <Stack p={3} pt={0}>
                <Typography fontWeight="bold" variant="h5">
                  Sci-fi Image
                </Typography>
                <Typography variant="h6">Generate Sci-fi images</Typography>
              </Stack>
            </Card>
          </Box>
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

export default Homepage;
