import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Box,
  Button,
  Container,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { connect, io } from "socket.io-client";
const socket = connect("http://localhost:3500");
function App() {
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmitUsername = (e) => {
    e.preventDefault();
    if (username != "") {
      setIsLogin(true);
      alert(`${username} login successfully`);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    setMessages((prev) => [...prev, { message: message, user: username }]);

    socket.emit("send_message", { message: message, user: username });
  };

  useEffect(() => {
    socket.on("received_message", (data) => {
      setMessages((prev) => [...prev, data.message]);
    });
  }, [socket]);

  return (
    <>
      {isLogin ? (
        <Container
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box>
            <Stack gap={1}>
              {messages.map((data, index) => {
                return (
                  <Typography
                    key={index}
                    variant="body1"
                    sx={{
                      backgroundColor: "primary.main",
                      borderRadius: 5,
                      width: "fit-content",
                      padding: 1,
                      color: "#FFF",
                    }}
                  >
                    {data.message}
                  </Typography>
                );
              })}
            </Stack>
            <Typography variant="h6">
              User: <span style={{ color: "steelblue" }}> {username}</span>{" "}
            </Typography>
            <form onSubmit={sendMessage}>
              <Stack gap={2}>
                <TextField
                  label="Message"
                  variant="outlined"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button variant="contained" endIcon={<Send />} type="submit">
                  Send Message
                </Button>
              </Stack>
            </form>
          </Box>
        </Container>
      ) : (
        <Container
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box>
            <Typography variant="h6">Enter your username:</Typography>
            <form onSubmit={handleSubmitUsername}>
              <Stack gap={1}>
                <TextField
                  label="ex. Bakal aKo"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button variant="contained" type="submit">
                  Enter
                </Button>
              </Stack>
            </form>
          </Box>
        </Container>
      )}
    </>
  );
}

export default App;
