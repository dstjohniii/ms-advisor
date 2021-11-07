import { Container } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ClassHolder from "./ClassHolder";
import Semester from "./Semester";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { isOffered } from "../../helper/rotationHelper.js";

export default function Planner({ data, setData, tabInfo, csvData }) {
  const [availableCols, setAvailableCols] = useState(null);

  //Useful for debugging
  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.log("tabInfoPlanner: ", tabInfo);
    }
  }, [tabInfo]);

  const onDragStart = ({ draggableId }) => {
    if (!csvData) {
      return;
    }

    const cols = [];
    data.columnOrder.forEach((key) => {
      if (isOffered(draggableId, key, csvData)) {
        cols.push(key);
      }
    });
    cols.push("available-classes");
    setAvailableCols(cols);
  };

  const onDragEnd = ({ destination, source, draggableId }) => {
    setAvailableCols(null);

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
  const availableTasks = useMemo(
    () => availableClasses.taskIds.map((taskId) => data.classes[taskId]),
    [availableClasses.taskIds, data.classes]
  );

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      sx={{ display: "flex" }}
    >
      <Container maxWidth={false} sx={{ display: "flex" }}>
        <Paper
          sx={{
            display: "flex",
            maxHeight: 750,
            marginRight: 10,
            position: "sticky",
            top: 0,
            backgroundColor: (theme) => theme.palette.grey[400],
          }}
        >
          <ClassHolder
            key={availableClasses.id}
            column={availableClasses}
            tasks={availableTasks}
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

            const isDropDisabled = !availableCols?.includes(column.id);

            return (
              <Box
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
                  isActive={availableCols?.includes(column.id)}
                />
              </Box>
            );
          })}
        </Paper>
      </Container>
    </DragDropContext>
  );
}
