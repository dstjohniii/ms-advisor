import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import courses from "../../../data/ClassInfo.json";
import { FormControl, FormLabel } from "@mui/material";


export default function CompletedCourses() {
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

  console.log(options);

  return (
    <Container
      sx={{
        marginTop: (theme) => theme.spacing(1),
        padding: (theme) => theme.spacing(1),
        marginBottom: (theme) => theme.spacing(1),
      }}
    >
      <Typography variant="h2">Completed and Transferred Courses</Typography>
      <Typography>Course stuff here</Typography>
      <FormGroup>
        <FormLabel>Select Courses</FormLabel>
        {options}
      </FormGroup>
    </Container>
  );
}
