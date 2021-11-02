import { Container } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ClassHolder from "./ClassHolder";
import Semester from "./Semester";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";

export default function Planner({ data, setData, compCourses }) {
  const [activeCol, setActiveCol] = useState(null);

  console.log(compCourses);
  
  useEffect(() => {
    console.log("checkedItemsPlanner: ", compCourses);
  }, [compCourses]);

  const onColumnClick = (columnId) => {
    setActiveCol(columnId);
    //TODO filter the available classes based on questions and semester constraints.
  };

  const onDragEnd = ({ destination, source, draggableId }) => {
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
    <DragDropContext onDragEnd={onDragEnd} sx={{ display: "flex" }}>
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
