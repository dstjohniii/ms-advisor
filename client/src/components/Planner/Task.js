import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import ListItem from "@mui/material/ListItem";
import { Draggable } from "react-beautiful-dnd";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import DragHandleIcon from "@mui/icons-material/DragHandle";

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          {...provided.draggableProps}
          ref={provided.innerRef}
          sx={{
            margin: (theme) => theme.spacing(1),
            boxShadow: 1,
            borderRadius: 1,
            backgroundColor: snapshot.isDragging ? "lightgreen" : "white",
          }}
        >
          <ListItemIcon {...provided.dragHandleProps}>
            <DragHandleIcon />
          </ListItemIcon>
          <ListItemText primary={task.content} />
        </ListItem>
      )}
    </Draggable>
  );
}
