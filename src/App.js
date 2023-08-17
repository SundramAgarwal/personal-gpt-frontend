import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import React, { useMemo } from "react"; // Import React and useMemo
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import Summary from "./pages/Summary";
import ScifiImage from "./pages/ScifilImage";
import Paragraph from "./pages/Paragraph";
import ChatBot from "./pages/ChatBot";
import JsConverter from "./pages/JsConverter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []); // Provide an empty array or appropriate dependencies
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/paragraph" element={<Paragraph />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/js-converter" element={<JsConverter />} />
          <Route path="/scifi-image" element={<ScifiImage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
