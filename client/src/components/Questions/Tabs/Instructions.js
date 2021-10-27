import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

export default function Instructions() {
  return (
    <Container
      sx={{
        marginTop: (theme) => theme.spacing(1),
        padding: (theme) => theme.spacing(1),
        marginBottom: (theme) => theme.spacing(1),
      }}
    >
      <Typography variant="h2">Welcome to the M.S. in Computer Science Advisor</Typography>
      <Typography>This tool can help MS Computer Science students plan their program so that they may meet 
        their <Link target = "_blank" href = "http://www.umsl.edu/cmpsci/graduate-studies/ms-compsci.html"> Course Requirements</Link>  within a desired time span. The tool can be used by new or existing students.</Typography>

      <Typography 
        sx={{
          fontSize : 30,
          lineHeight: 2,
          }} > Instructions: Degree planning is done in two stages</Typography>

      <Typography 
        sx={{
          fontSize : 24,
          lineHeight: 1.5,
          }}>Course Details:</Typography>
      <Typography>Please use the DEGREE PATHS tab to select your desired degree from the options listed. Then use the COURSES tabs to determine which courses will be required for your selected degree.</Typography>

      <Typography 
        sx={{
          fontSize : 24,
          lineHeight: 1.5,
          }}>Course Planning:</Typography>
      <Typography>In the course selection section, students will choose which courses they plan to take to complete their CS Masters degree. The course information that facilitates planning comes from two 
        primary sources: the upcoming scheduled courses available in MyView for registration, and the course rotation, which include the standard 3-year rotation and unofficial rotation. Courses not listed in either 
        rotation can still be planned as unspecified elective. <Link target = "_blank" href = "https://bulletin.umsl.edu/artsandsciences/computerscience/#courseinventory"> Click here for a full list of CMP SCI Courses</Link></Typography>      
    </Container>
  );
}
