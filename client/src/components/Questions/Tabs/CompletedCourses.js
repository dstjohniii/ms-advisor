import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import courses from "../../../data/ClassInfo.json";

export default function CompletedCourses() {
  const [compCourses, setCompCourses] = useState({});

  const handleChange = (e) => {
    if (e.target.checked) {
      setCompCourses({...compCourses, [e.target.id] : e.target.value});
    } else {
      delete compCourses[e.target.id];
      setCompCourses({...compCourses})
    }
  }

  useEffect(() => {
    console.log("checkedItems: ", compCourses);
  }, [compCourses]);

  const options = courses.map((item) => {
    let label = `${item.subject} ${item.courseNum} - ${item.courseName}`
    let id = `${item.subject.charAt(0)}${item.courseNum}`
    
    return (
      <FormControlLabel
        label={label}
        key={label}
        value={item}
        control={<Checkbox id={id} value={item} onChange={handleChange}/>}
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
