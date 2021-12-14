import ListItem from "@mui/material/ListItem";
import { Draggable } from "react-beautiful-dnd";
import ListItemText from "@mui/material/ListItemText";
import courses from "../../data/ClassInfo.json";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 240,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

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
            maxWidth: 240,
            display: "flex",
            backgroundColor: snapshot.isDragging ? "lightgreen" : "white",
          }}
        >
          <CustomTooltip
            placement="top-start"
            title={
              courses.filter((c) => String(c.courseNum) === String(task?.id))[0]
                .description
            }
            // title="foo"
          >
            <ListItemText primary={task?.content} />
          </CustomTooltip>
        </ListItem>
      )}
    </Draggable>
  );
}
