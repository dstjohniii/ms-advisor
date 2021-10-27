import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import courses from "../../../data/ClassInfo.json";

export default function CompletedCourses() {
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (e) => {
    setCheckedItems({...checkedItems, [e.target.name] : e.target.checked });
  }

  useEffect(() => {
    console.log("checkedItems: ", checkedItems);
  }, [checkedItems]);

  const options = courses.map((item) => {
    let label = `${item.subject} ${item.courseNum} - ${item.courseName}`
    let name = `${item.subject}${item.courseNum}`
    
    return (
      <FormControlLabel
        label={label}
        key={label}
        value={item}
        control={<Checkbox name={name} onChange={handleChange}/>}
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
