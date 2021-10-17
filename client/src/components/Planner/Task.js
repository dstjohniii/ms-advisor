import ListItem from "@mui/material/ListItem";
import { Draggable } from "react-beautiful-dnd";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DragHandleIcon from "@mui/icons-material/DragHandle";

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={task?.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          sx={{
            margin: (theme) => theme.spacing(1),
            boxShadow: 1,
            borderRadius: 1,
            backgroundColor: snapshot.isDragging ? "lightgreen" : "white",
          }}
        >
          <ListItemText primary={task?.content} />
        </ListItem>
      )}
    </Draggable>
  );
}
