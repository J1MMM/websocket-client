import { Stack, Typography } from "@mui/material";
import React from "react";

function Convo(props) {
  const messages = props.messages.map((data, index) => {
    return (
      <Stack key={index}>
        <Typography
          variant="caption"
          sx={{
            borderRadius: 5,
            width: "fit-content",
            padding: 1,
            pb: 0,
            color: "grey",
            alignSelf: data.user == props.username ? "end" : "start",
            position: "relative",
          }}
        >
          {data.user}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            backgroundColor:
              data.user == props.username ? "primary.main" : "lightgray",
            borderRadius: 5,
            width: "fit-content",
            padding: 1,
            color: data.user == props.username ? "#FFF" : "#000",
            alignSelf: data.user == props.username ? "end" : "start",
            position: "relative",
          }}
        >
          {data.message}
        </Typography>
      </Stack>
    );
  });

  return (
    <Stack
      width={"100%"}
      zIndex={1}
      boxSizing={"border-box"}
      padding={1}
      sx={{
        overflowY: "scroll",
        "  ::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {messages}
    </Stack>
  );
}

export default Convo;
