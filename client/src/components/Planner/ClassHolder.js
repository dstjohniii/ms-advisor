import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

export default function ClassHolder({
  column,
  tasks,
  isDropDisabled,
  isActive,
}) {
  return (
    <Paper
      sx={{
        margin: (theme) => theme.spacing(1),
        width: 300,
        padding: 1,
        display: "flex",
        overflowY: "scroll",
        flexDirection: "column",
        paddingTop: 0,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          background: "white",
          padding: 1,
        }}
      >
        {column.title}
      </Typography>
      <Droppable droppableId={column.id} isDropDisabled={isDropDisabled}>
        {(provided, snapshot) => (
          <List
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              flexGrow: 1,
              minHeight: 100,
            }}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </Paper>
  );
}
