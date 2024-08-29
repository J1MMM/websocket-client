import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Box,
  Button,
  Container,
  IconButton,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle, Person, Send } from "@mui/icons-material";
import { connect, io } from "socket.io-client";
import Header from "./components/header";
import Convo from "./components/convo";
import MessageInput from "./components/message_input";
const socket = connect("http://192.168.1.14:3500");
function App() {
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmitUsername = (e) => {
    e.preventDefault();
    if (username != "") {
      setIsLogin(true);
      alert(`${username} login successfully`);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (message.trim() !== "") {
      try {
        setMessages((prev) => [...prev, { message: message, user: username }]);

        socket.emit("send_message", { message: message, user: username });
        setMessage("");
      } catch (error) {
        setMessage((prev) => [...prev, { message: error, user: username }]);
      }
    }
  };

  useEffect(() => {
    socket.on("received_message", (data) => {
      setMessages((prev) => [
        ...prev,
        { message: data.message, user: data.user },
      ]);
    });
  }, [socket]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        boxSizing: "border-box",
        bgcolor: "#1A1E23",
      }}
    >
      {isLogin ? (
        <Paper
          className={darkMode ? "bg" : ""}
          elevation={3}
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
            boxSizing: "border-box",
            maxWidth: 500,
          }}
        >
          <Box
            height={"100%"}
            width={"100%"}
            boxSizing={"border-box"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"end"}
            flexDirection={"column"}
          >
            <Header username={username} setDarkMode={setDarkMode} />
            <Convo messages={messages} username={username} />
            <MessageInput
              sendMessage={sendMessage}
              message={message}
              setMessage={setMessage}
            />
          </Box>
        </Paper>
      ) : (
        <Container
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 0,
            m: 0,
          }}
        >
          <Paper
            sx={{
              padding: 5,
            }}
          >
            <Typography variant="h6" mb={1}>
              Login
            </Typography>
            <form onSubmit={handleSubmitUsername}>
              <Stack gap={1}>
                <TextField
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                />
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Stack>
            </form>
          </Paper>
        </Container>
      )}
    </Box>
  );
}

export default App;
