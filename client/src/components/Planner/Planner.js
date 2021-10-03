import { Container, Typography } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ClassDrawer from "./ClassDrawer";
import ColumnType from "./ColumnType";
import initialData from "./initial-data";

export default function Planner() {
  const [data, setData] = useState(initialData);
  const [homeIndex, setHomeIndex] = useState(null);

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

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <ClassDrawer />
      <Container sx={{ display: "flex" }}>
        {data.columnOrder.map((columnId, index) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          //   const isDropDisabled = index < homeIndex; TODO setup to only allow draggable onto the selected column
          const isDropDisabled = false;

          return (
            <ColumnType
              key={column.id}
              column={column}
              tasks={tasks}
              isDropDisabled={isDropDisabled}
            />
          );
        })}
      </Container>
    </DragDropContext>
  );
}
