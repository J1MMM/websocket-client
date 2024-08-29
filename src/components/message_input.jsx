import { Send } from "@mui/icons-material";
import { IconButton, Stack, TextField } from "@mui/material";
import React from "react";

function MessageInput(props) {
  return (
    <form
      onSubmit={props.sendMessage}
      style={{
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} padding={1}>
        <TextField
          label="Message"
          variant="outlined"
          value={props.message}
          onChange={(e) => props.setMessage(e.target.value)}
          fullWidth
        />

        <IconButton type="submit" color="primary">
          <Send />
        </IconButton>
      </Stack>
    </form>
  );
}

export default MessageInput;
