import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import parseCSVFile from '../../../csvParser';
import dataFile from '../../../data/rotation_cleaned.csv';
import courses from "../../../data/ClassInfo.json";


export default function RestrictedCourses() {

  let courseLabels = courses.map(
    a => a.subject + " " + a.courseNum + " - " + a.courseName
    
    );

  const options = courseLabels.map((item) => {
    return (
      <FormControlLabel key={item} value={item} control={<Checkbox/>} label={item}>
        {item}
      </FormControlLabel>
      )
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
      <Typography>Select restricted courses already completed/in progress</Typography>
      <FormGroup>
        {options}
      </FormGroup>
    </Container>
  );
}
