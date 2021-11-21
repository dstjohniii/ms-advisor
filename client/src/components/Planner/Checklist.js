import { ListItem, ListItemText, ListSubheader, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List"

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
			<Typography sx={{padding: 1}}>
				Total completed courses: {tabInfo.completed.length * 3} / 30
			</Typography>
      <hr/>
      {tabInfo.restricted.length > 0 && 
        <List sx={{py: 0}}>
          <ListSubheader> Restricted Courses: </ListSubheader>
            {tabInfo.restricted.sort().map((a) => {
              let primary = `Comp Sci ${a.substring(1)}`;
              return(
                <ListItem sx={{py: 0}}>
                  <ListItemText sx={{py: 0, px: 2}} primary={primary}/> 
                </ListItem>
              );
            })}
        </List>
      }
    </Paper>
  );
}