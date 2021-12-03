import { Container, Button } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ClassHolder from "./ClassHolder";
import Semester from "./Semester";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Checklist from "./Checklist";
import {
  isOffered,
  getPrereqTypes,
  getPrereqIds,
  isPrereqsSatisfiedComplete,
  getSemesters,
  getDataColumns,
  isCourseComplete,
} from "../../helper/rotationHelper.js";
import AlertSnackbar from "../AlertSnackbar";
import courses from "../../data/ClassInfo.json";

export default function Planner({ data, setData, tabInfo, csvData }) {
  const [availableCols, setAvailableCols] = useState(null);
  const [showSnack, setShowSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState(null);
  const [plannedCourses, setPlannedCourses] = useState([]);
  const [year, setYear] = useState(null);

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
    let columns = Object.assign({}, data.columns, {
      "available-classes": null,
    });
    let columnsArray = Object.values(columns);
    let tempArray = [].concat(
      ...columnsArray.filter((v) => v).map((a) => a.taskIds || [])
    );
    setPlannedCourses(tempArray);
  }, [data]);

  // filter out completed / waived courses
  useEffect(() => {
    let newData = { ...data };
    console.log(`newData`, newData);
    newData.columns["available-classes"].taskIds = Object.keys(newData.classes)
      .filter((a) => {
        let response = true;
        getSemesters(newData).forEach((c) => {
          if (c.taskIds.includes(a)) {
            response = false;
            return;
          }
        });
        return response;
      })
      .reverse();

    getDataColumns(newData).forEach(
      (c) =>
        (c.taskIds = c.taskIds.filter((t) => !isCourseComplete(t, tabInfo)))
    );
    setData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabInfo]);

  //set year and add three years to display
  useEffect(() => {
    var newData = {...data};
    const time = new Date();
    var x = time.getFullYear();

    for(var i = 0; i < 3; i++){
      var y = x + i;
      var spKey = "SP-" + y;
      var ssKey = "SS-" + y;
      var fsKey = "FS-" + y;
      var spTitle = "Spring " + y;
      var ssTitle = "Summer " + y;
      var fsTitle = "Fall " + y;

      var spring = {
        key: spKey,
        id: spKey,
        title: spTitle,
        taskIds: []
      };
      var summer = {
        key: ssKey,
        id: ssKey,
        title: ssTitle,
        taskIds: []
      };
      var fall = {
        key: fsKey,
        id: fsKey,
        title: fsTitle,
        taskIds: []
      };

      newData.columns[spKey] = spring;
      newData.columnOrder.push(spKey);
      newData.columns[ssKey] = summer;
      newData.columnOrder.push(ssKey);
      newData.columns[fsKey] = fall;
      newData.columnOrder.push(fsKey);
    }
    setYear(y);
  },[])

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

    // warn user to select a pre-req if selecting a 6000.
    if (
      String(draggableId).startsWith("6") &&
      !isPrereqsSatisfiedComplete(draggableId, data, tabInfo)
    ) {
      let prereqs = getPrereqIds(draggableId);
      const prereqTypes = getPrereqTypes(draggableId);

      if (
        prereqs.length !== 0 &&
        destination.droppableId !== "available-classes"
      ) {
        setShowSnack(true);
        let msg = `The following course(s) must be taken before CS ${draggableId}\n`;
        courses
          .filter((v) => prereqs.includes("" + v.courseNum))
          .forEach((item, i, arr) => {
            msg = msg + `CS ${item.courseNum} - ${item.courseName}\n`;
            if (i !== arr.length - 1) msg = `${msg}${prereqTypes[0]}\n`;
          });
        setSnackMsg(msg.slice(0, -1));
      }
    } else {
      setShowSnack(false);
    }

    // update data with new column values
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

  //Code to add and remove year
  function addYear(){
    var newData = {...data};
    var y = year + 1;
    var spKey = "SP-" + y;
    var ssKey = "SS-" + y;
    var fsKey = "FS-" + y;
    var spTitle = "Spring " + y;
    var ssTitle = "Summer " + y;
    var fsTitle = "Fall " + y;

    var spring = {
      key: spKey,
      id: spKey,
      title: spTitle,
      taskIds: []
    };
    var summer = {
      key: ssKey,
      id: ssKey,
      title: ssTitle,
      taskIds: []
    };
    var fall = {
      key: fsKey,
      id: fsKey,
      title: fsTitle,
      taskIds: []
    };
    newData.columns[spKey] = spring;
    newData.columnOrder.push(spKey);
    newData.columns[ssKey] = summer;
    newData.columnOrder.push(ssKey);
    newData.columns[fsKey] = fall;
    newData.columnOrder.push(fsKey);
    setYear(y);
  }

  function removeYear(){
    const time = new Date();
    if(year >= time.getFullYear()){
      let newData = {...data};
      var spring = "SP-" + year;
      var summer = "SS-" + year;
      var fall = "FS-" + year;
      Object.keys(newData.columns).forEach(function (key) {
        if(key.match(fall)){
          for(var i = 0; i < newData.columns[fall].taskIds.length; i++){
            newData.columns["available-classes"].taskIds.push(newData.columns[fall].taskIds[i]);
          }
          newData.columns["available-classes"].taskIds.sort().reverse();
          delete newData.columns[key];
        } 
      });
      Object.keys(newData.columns).forEach(function (key) {
        if(key.match(summer)){
          for(var i = 0; i < newData.columns[summer].taskIds.length; i++){
            newData.columns["available-classes"].taskIds.push(newData.columns[summer].taskIds[i]);
          }
          newData.columns["available-classes"].taskIds.sort().reverse();
          delete newData.columns[key];
        } 
      });
      Object.keys(newData.columns).forEach(function (key) {
        if(key.match(spring)){
          for(var i = 0; i < newData.columns[spring].taskIds.length; i++){
            newData.columns["available-classes"].taskIds.push(newData.columns[spring].taskIds[i]);
          }
          newData.columns["available-classes"].taskIds.sort();
          delete newData.columns[key];
        } 
      });
      newData.columnOrder.pop();
      newData.columnOrder.pop();
      newData.columnOrder.pop();    
      setData(newData);
      setYear(year -1);   
    } 
  }

  const availableClasses = data.columns["available-classes"];
  const availableTasks = useMemo(
    () => availableClasses.taskIds.map((taskId) => data.classes[taskId]),
    [availableClasses.taskIds, data]
  );

  return (
    <div>
      <AlertSnackbar
        showSnack={showSnack}
        setShowSnack={setShowSnack}
        msg={snackMsg}
      />
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
              marginRight: 5,
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
          
          <div
            sx={{
              height: 10,
              width: 10,
            }}
          >
            <Button variant = "dark" onClick = {addYear}>Add Year</Button>
            <Button variant = "dark" onClick = {removeYear}>Remove Year</Button>
          </div>

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
              const tasks = column.taskIds.map(
                (taskId) => data.classes[taskId]
              );

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
                  isDropDisabled={isDropDisabled}
                  isActive={availableCols?.includes(column.id)}
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
            ></Checklist>
          </Paper>
        </Container>
      </DragDropContext>
    </div>
  );
}
