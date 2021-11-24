import { Container } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ClassHolder from "./ClassHolder";
import Semester from "./Semester";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { isOffered } from "../../helper/rotationHelper.js";
import Checklist from "./Checklist";

export default function Planner({ data, setData, tabInfo, csvData }) {
  const [availableCols, setAvailableCols] = useState(null);
  const [plannedCourses, setPlannedCourses] = useState([]);
  
  console.log("csvDataPlanner: ", csvData);

  //Useful for debugging
  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.log("tabInfoPlanner: ", tabInfo);
    }
  }, [tabInfo]);

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.log("dataEffect: ", data);
    }
  }, [data]);

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.log("plannedCourses: ", plannedCourses);
    }
  }, [plannedCourses]);

  // save planned courses when placing courses
  useEffect(() => {
    let columns = Object.assign({}, data.columns, {'available-classes': null});
    let columnsArray = Object.values(columns);
    let tempArray = [].concat(...columnsArray.filter((v) => v).map((a) => a.taskIds || []));
    setPlannedCourses(tempArray);
  }, [data]);

  // filter out completed / waived courses
  useEffect(() => {
    let newData = { ...data };
    console.log(`newData`, newData);
    newData.columns["available-classes"].taskIds = Object.keys(newData.classes)
      .filter((a) => {
        let response = true;
        Object.entries(newData.columns).forEach((c) => {
          if (c[1].id !== "available-classes" && c[1].taskIds.includes(a)) {
            response = false;
            return;
          }
        });
        return response;
      })
      .reverse();

    Object.entries(newData.columns).forEach(
      (c) =>
        (c[1].taskIds = c[1].taskIds.filter(
          (t) =>
            !tabInfo?.restricted.map((r) => (r = r.substring(1))).includes(t) &&
            !tabInfo?.completed.map((r) => (r = r.substring(1))).includes(t) &&
            !tabInfo?.waived.map((r) => (r = r.substring(1))).includes(t)
        ))
    );
    setData(newData);
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
        taskIds: newTaskIds.sort().reverse(),
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
      taskIds: finishTaskIds.sort().reverse(),
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
        <Paper
          sx={{
            display: "flex",
            maxHeight: 750,
            marginLeft: 10,
            position: "sticky",
            top: 0,
            backgroundColor: (theme) => theme.palette.grey[400],
          }}
        >
          <Checklist 
            tabInfo={tabInfo}
            plannedCourses={plannedCourses}
            csvData={csvData}
          >
          </Checklist>
      </Paper>
      </Container>
    </DragDropContext>
  );
}
