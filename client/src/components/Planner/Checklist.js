import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

export default function Checklist() {
  return (
    <Paper
      sx={{
        margin: (theme) => theme.spacing(1),
        width: 300,
        padding: 1,
        overflowY: "scroll",
        paddingTop: 0,
      }}
    >
    <Typography> Hello! </Typography>
    </Paper>
  );
}