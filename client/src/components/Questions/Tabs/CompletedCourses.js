import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function CompletedCourses() {
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
    </Container>
  );
}
