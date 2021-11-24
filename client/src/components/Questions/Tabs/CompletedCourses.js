import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import courses from "../../../data/ClassInfo.json";

export default function CompletedCourses({ tabInfo, setTabInfo }) {
  const handleChange = (e) => {
    if (e.target.checked) {
      //Copy to a new array and push the new item to it
      //Then add the new array to the state object and update
      //If there's a fancy way of doing this, please change it
      let newArray = tabInfo.completed.slice();
      newArray.push(e.target.id);
      const newCompCourses = { ...tabInfo, completed: newArray };
      setTabInfo(newCompCourses);
    } else {
      let newArray = tabInfo.completed.slice();
      let filteredArray = newArray.filter((item) => item !== e.target.id);
      const newCompCourses = { ...tabInfo, completed: filteredArray };
      setTabInfo(newCompCourses);
    }
  };

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.log("checkedItemsCompTab: ", tabInfo);
    }
  }, [tabInfo]);

  const options = courses
    .filter((v) => !v.restricted)
    .map((item) => {
      let label = `${item.subject} ${item.courseNum} - ${item.courseName}`;
      let id = `${item.courseNum}`;
      let checked = tabInfo.completed.includes(id);

      return (
        <FormControlLabel
          key={id}
          //To supress warnings about <div> cannot appear as a descendant of <p>.
          component={"span"}
          label={label}
          control={
            <Checkbox
              id={id}
              checked={checked}
              value={item}
              onChange={handleChange}
            />
          }
        />
      );
    });

  return (
    <Container
      sx={{
        marginTop: (theme) => theme.spacing(1),
        padding: (theme) => theme.spacing(1),
        marginBottom: (theme) => theme.spacing(1),
      }}
    >
      <Typography variant="h2">Completed and Transferred Courses</Typography>
      <Typography>Select courses already completed/in progress</Typography>
      <FormGroup>{options}</FormGroup>
    </Container>
  );
}
