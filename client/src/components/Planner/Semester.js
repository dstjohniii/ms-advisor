import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

export default function ColumnType({
  column,
  tasks,
  isDropDisabled,
  isActive,
}) {
  return (
    <Paper
      fixed
      sx={{
        margin: (theme) => theme.spacing(1),
        width: 300,
        padding: 1,
        display: "flex",
        overflowY: "scroll",
        maxHeight: 240,
        flexDirection: "column",
        border: isActive ? 3 : 0,
        borderColor: "green",
      }}
    >
      <Typography variant="h3">{column.title}</Typography>
      <Droppable droppableId={column.id} isDropDisabled={isDropDisabled}>
        {(provided, snapshot) => (
          <List
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              borderRadius: 1,
              backgroundColor: snapshot.isDraggingOver ? "skyblue" : "white",
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
