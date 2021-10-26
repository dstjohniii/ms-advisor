import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import courses from "../../../data/ClassInfo.json";


let restCourses = courses.filter((restCourses)=>restCourses.core)

let courseLabels = restCourses.map(
  a => a.subject + " " + a.courseNum + " - " + a.courseName
  );

export default function RestrictedCourses() {
   
  const options = courseLabels.map((item) => {
    return (
      
      <FormControlLabel 
      key={item} 
      value={item} 
      control={<Checkbox/>} 
      label={item}
      />
     
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
      <Typography variant="h2">Waived Courses</Typography>
      <Typography>Select waived courses already completed/in progress</Typography>
      <FormGroup>
        {options}
      </FormGroup>
    </Container>
  );
}
