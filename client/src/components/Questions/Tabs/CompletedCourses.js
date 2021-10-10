import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import courses from "../../../data/ClassInfo.json";
import parseCSVFile from "../../../csvParser";
import rotationCSV from "../../../data/rotation_cleaned.csv";
import { FormControl, FormLabel } from "@mui/material";

var data = parseCSVFile(rotationCSV);

export default function CompletedCourses() {
  var rotation = data[0];
  let classCodes = rotation.map(a => a.Discipline + " " + a.Number);

  const options = classCodes.map((item) => {
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
