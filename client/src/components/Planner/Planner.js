import { useState, useMemo, useEffect, useCallback } from "react";
import { Container } from "@mui/material";
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import IconButton from "@mui/material/IconButton";
import CreditDialog from "../CreditDialog";
import Button from "@mui/material/Button";
import InstructionModal from "./InstructionModal";

export default function Planner({
  data,
  setData,
  tabInfo,
  csvData,
  year,
  setYear,
  courseCredits,
  setCourseCredits,
  instructionModal,
  setInstructionModal,
}) {
  const [availableCols, setAvailableCols] = useState(null);
  const [showSnack, setShowSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState(null);
  const [plannedCourses, setPlannedCourses] = useState([]);
  const [creditOpen, setCreditOpen] = useState(false);

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
    if (!year) {
      const time = new Date();
      var fullYear = time.getFullYear();
      addYear(fullYear);
      addYear(fullYear + 1);
      addYear(fullYear + 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenInstructions = useCallback(() => {
    setInstructionModal(true);
  }, [setInstructionModal]);

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
      !isPrereqsSatisfiedComplete(draggableId, data, tabInfo, plannedCourses)
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

    // update the credits
    if (destination.droppableId !== "available-classes") {
      const credit = courses.filter(
        (c) => String(c.courseNum) === String(draggableId)
      )[0].credits;

      if (typeof credit === "string") {
        setCreditOpen(draggableId);
      } else {
        let tempCredits = {
          ...courseCredits,
          [draggableId]: courses.filter(
            (c) => String(c.courseNum) === String(draggableId)
          )[0].credits,
        };
        setCourseCredits(tempCredits);
      }
    } else {
      let tempCredits = {
        ...courseCredits,
      };
      delete tempCredits[draggableId];
      setCourseCredits(tempCredits);
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
  function addYear(y) {
    var newData = { ...data };
    var localYear = typeof y === "number" ? y : year + 1;
    addSemester(localYear, "SP", "Spring", newData);
    addSemester(localYear, "SS", "Summer", newData);
    addSemester(localYear, "FS", "Fall", newData);
    setData(newData);
    setYear(localYear);
  }

  function addSemester(y, key, semester, newData) {
    const semKey = key + "-" + y;
    const spTitle = semester + " " + y;
    const semStruct = {
      key: semKey,
      id: semKey,
      title: spTitle,
      taskIds: [],
    };

    newData.columns[semKey] = semStruct;
    newData.columnOrder.push(semKey);
  }

  function removeYear() {
    const time = new Date();
    if (year > time.getFullYear()) {
      let newData = { ...data };
      removeSemester("SP-" + year, newData);
      removeSemester("SS-" + year, newData);
      removeSemester("FS-" + year, newData);
      setData(newData);
      setYear(year - 1);
    }
  }

  function removeSemester(semester, newData) {
    Object.keys(newData.columns).forEach((key) => {
      if (key === semester) {
        newData.columns[semester].taskIds.forEach((t) => {
          newData.columns["available-classes"].taskIds.push(t);
        });
        newData.columns["available-classes"].taskIds.sort().reverse();
        delete newData.columns[key];
      }
    });
    newData.columnOrder.pop();
  }

  const availableClasses = data.columns["available-classes"];
  const availableTasks = useMemo(
    () => availableClasses.taskIds.map((taskId) => data.classes[taskId]),
    [availableClasses.taskIds, data.classes]
  );

  return (
    <div>
      <AlertSnackbar
        showSnack={showSnack}
        setShowSnack={setShowSnack}
        msg={snackMsg}
      />
      <CreditDialog
        open={creditOpen}
        setOpen={setCreditOpen}
        courseCredits={courseCredits}
        setCourseCredits={setCourseCredits}
      />
      <InstructionModal open={instructionModal} setOpen={setInstructionModal} />
      <Button onClick={handleOpenInstructions}>Instructions</Button>
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

          <div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                position: "sticky",
                top: 0,
                backgroundColor: (theme) => "white",
                zIndex: 10,
                borderRadius: 2,
              }}
            >
              <IconButton onClick={removeYear}>
                <RemoveCircleRoundedIcon />
              </IconButton>
              <IconButton onClick={addYear}>
                <AddCircleIcon />
              </IconButton>
            </Box>
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
          </div>

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
              courseCredits={courseCredits}
            ></Checklist>
          </Paper>
        </Container>
      </DragDropContext>
    </div>
  );
}
