import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Droppable } from "react-beautiful-dnd";

import Task from "./Task";

export default function ColumnType({ column, tasks, isDropDisabled }) {
  return (
    <Container
      fixed
      sx={{
        margin: (theme) => theme.spacing(1),
        boxShadow: 1,
        borderRadius: 1,
        width: 300,
        padding: 1,
        display: "flex",
        flexDirection: "column",
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
    </Container>
  );
}
