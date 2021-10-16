import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import courses from "../../../data/ClassInfo.json";

function isRestricted(value){
  let retValue=value.restricted
  return retValue
}

let restCourses = courses.filter(isRestricted)

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
      >
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
      <Typography variant="h2">Restricted Courses</Typography>
      <Typography>Select restricted courses already completed/in progress</Typography>
      <FormGroup>
        {options}
      </FormGroup>
    </Container>
  );
}
