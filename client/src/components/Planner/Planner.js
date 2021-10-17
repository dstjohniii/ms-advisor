import { Container } from "@mui/material";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ClassHolder from "./ClassHolder";
import Semester from "./Semester";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";

export default function Planner({ data, setData }) {
  const [homeIndex, setHomeIndex] = useState(null);
  const [activeCol, setActiveCol] = useState(null);

  const onColumnClick = (columnId) => {
    setActiveCol(columnId);
    //TODO filter the available classes based on questions and semester constraints.
  };

  const onDragStart = (start) => {
    setHomeIndex(data.columnOrder.indexOf(start.source.droppableId));
  };

  const onDragEnd = ({ destination, source, draggableId }) => {
    setHomeIndex(null);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newData);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newData);
  };

  const availableClasses = data.columns["available-classes"];
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      sx={{ display: "flex" }}
    >
      <Container sx={{ display: "flex", maxHeight: 800 }}>
        <Paper
          sx={{
            display: "flex",
            marginRight: 10,
            backgroundColor: (theme) => theme.palette.grey[400],
          }}
        >
          <ClassHolder
            key={availableClasses.id}
            column={availableClasses}
            tasks={availableClasses.taskIds.map(
              (taskId) => data.classes[taskId]
            )}
          />
        </Paper>

        <Paper
          sx={{
            display: "flex",
            flexWrap: "wrap",
            backgroundColor: (theme) => theme.palette.grey[400],
            justifyContent: "center",
          }}
        >
          {data.columnOrder.map((columnId, index) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.classes[taskId]);

            //   const isDropDisabled = index < homeIndex; TODO setup to only allow draggable onto the selected column
            const isDropDisabled = activeCol !== column.id;
            // const isDropDisabled = true;

            return (
              <Box
                onClick={() => onColumnClick(column.id)}
                sx={{
                  display: "flex",
                  paddingLeft: 0,
                }}
                key={column.id}
                column={column}
                tasks={tasks}
              >
                <Semester
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  isDropDisabled={isDropDisabled}
                  isActive={activeCol === column.id}
                />
              </Box>
            );
          })}
        </Paper>
      </Container>
    </DragDropContext>
  );
}
