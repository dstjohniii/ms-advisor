import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

export default function Checklist({ tabInfo }) {
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
      <Typography
        variant="h3"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          background: "white",
          padding: 1,
        }}
      > 
      Degree Checklist
      </Typography>
			<Typography>
				Total completed courses: {tabInfo.completed.length * 3} / 30
			</Typography>
    </Paper>
  );
}