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
    //I had to pass the value as a string and then reconvert to object
    //Passing as an object just returns a string "[object Object]"
    //If someone smarter than me can make this less messy, go ahead
    let course = JSON.parse(e.target.value);
    course['isChecked'] = e.target.checked;
    if (e.target.checked) {
      params.setCompCourses({...params.compCourses, [e.target.id] : course});
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
    let strItem = JSON.stringify(item);
    //If never checked, 'isChecked' is undefined
    //Use short-circut evaluation to set undefined values to false
    //Makes MUI happy
    let checked = _get(params.compCourses, [id, 'isChecked']) || false;
    
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
            value={strItem} 
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
