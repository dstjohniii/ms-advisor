import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function RestrictedCourses() {
 
  return (
    <Container
      sx={{
        marginTop: (theme) => theme.spacing(1),
        padding: (theme) => theme.spacing(1),
        marginBottom: (theme) => theme.spacing(1),
      }}
    >
      <Typography variant="h3">Restricted Courses</Typography>
      <Typography>Please select any restricted courses</Typography>
      <Typography variant="h2">COMPUTER SCIENCE</Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label="1250 - Introduction to Computing"
        />

        <FormControlLabel
          control={<Checkbox />}
          label="2250 - Programming and Data Structures"
        />

        <FormControlLabel
          control={<Checkbox />}
          label="2261 - Oject-Oriented Programming"
        />

       <FormControlLabel
          control={<Checkbox />}
          label="2700 - Computer Organization & Architecture"
        />

      <FormControlLabel
          control={<Checkbox />}
          label="2750 - System Programming and Tools"
        />

       <FormControlLabel
          control={<Checkbox />}
          label="3010 - Web Programming"
        />
      
      <FormControlLabel
          control={<Checkbox />}
          label="3130 - Design and Analysis of Algorithms"
        />

       <FormControlLabel
          control={<Checkbox />}
          label="1320 - Applied Statistics I"
        />
 <Typography variant="h2">MATHEMATICS</Typography>
      <FormControlLabel
          control={<Checkbox />}
          label="1800 - Analytic Geometry and Calculus I"
        />

      <FormControlLabel
          control={<Checkbox />}
          label="1900 - Analytic Geometry and Calculus II"
        />

      <FormControlLabel
          control={<Checkbox />}
          label="2450 - Elementary Linear Algebra"
        />

     <FormControlLabel
          control={<Checkbox />}
          label="3000 - Discrete Structures"
        />


      </FormGroup>
    </Container>
  );
}
