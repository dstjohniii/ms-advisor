import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function WaivedCourses() {
  return (
    <Container
      sx={{
        marginTop: (theme) => theme.spacing(1),
        padding: (theme) => theme.spacing(1),
        marginBottom: (theme) => theme.spacing(1),
      }}
    >
      <Typography variant="h2">Waived Courses</Typography>
      <Typography>Instructions go here.</Typography>
    </Container>
  );
}
