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
      <Typography variant="h2">Restricted Courses</Typography>
      <Typography>Instructions go here.</Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label="1250 - Introduction to Computing"
        />
        <FormControlLabel
          control={<Checkbox />}
          label="2250 - Programming and Data Structures"
        />
      </FormGroup>
    </Container>
  );
}
