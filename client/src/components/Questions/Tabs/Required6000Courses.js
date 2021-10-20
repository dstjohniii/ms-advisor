import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import courses from "../../../data/ClassInfo.json";

export default function Required6000Courses() {
  
  const courses6000 = courses.filter(
    (v) => v.courseNum.toString().charAt(0) === '6'
    );

  const courseLabels = courses6000.map(
    (a) => `${a.subject} ${a.courseNum} - ${a.courseName}`
    );

  const options = courseLabels.map((item) => {
    return (
      <FormControlLabel 
        key={item} 
        value={item} 
        control={<Radio />} 
        label={item}
      >
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
      <Typography variant="h2">6000 Level Required Courses</Typography>
      <Typography>Please select your preferred 6000 level course</Typography>
      <RadioGroup
        name="6000-lvl-group"
      >
        {options}
      </RadioGroup>
    </Container>
  );
}
