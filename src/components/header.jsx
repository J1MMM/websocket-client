import { AccountCircle, Call, Info, Videocam } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function Header(props) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        zIndex: 5,
        position: "absolute",
        width: "100%",
        boxSizing: "border-box",
        borderRadius: 0,
        top: 0,
      }}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt="Remy Sharp" sx={{ width: "35px", height: "35px" }} />
          </StyledBadge>
          <Stack>
            <Typography variant="h6" fontWeight={600}>
              HEROES
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
              sx={{
                mt: -0.5,
              }}
            >
              Active now
            </Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <IconButton>
            <Call color="secondary" />
          </IconButton>
          <IconButton>
            <Videocam color="secondary" />
          </IconButton>
          <IconButton onClick={() => props.setDarkMode((prev) => !prev)}>
            <Info color="secondary" />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
}
