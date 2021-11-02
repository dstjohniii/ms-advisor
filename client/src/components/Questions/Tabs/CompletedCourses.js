import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { get as _get } from "lodash"
import courses from "../../../data/ClassInfo.json";

export default function CompletedCourses(params) {
  const handleChange = (e) => {
    if (e.target.checked) {
      let newArray = params.compCourses.completed.slice();
      newArray.push(e.target.id);
      const newCompCourses = {...params.compCourses, completed: newArray};
      params.setCompCourses(newCompCourses);
    } else {
      delete params.compCourses[e.target.id];
      params.setCompCourses({...params.compCourses})
    }
  }

  useEffect(() => {
    console.log("checkedItems: ", params.compCourses);
  }, [params.compCourses]);

  const options = courses.map((item) => {
    let label = `${item.subject} ${item.courseNum} - ${item.courseName}`
    let id = `${item.subject.charAt(0)}${item.courseNum}`
    let checked = params.compCourses.completed.includes(id);
    
    return (
      <FormControlLabel
        key={id}
        //To supress warnings about <div> cannot appear as a descendant of <p>.
        component={'span'}
        label={label}
        control={
          <Checkbox 
            id={id} 
            checked={checked} 
            value={item} 
            onChange={handleChange}
          />}
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
