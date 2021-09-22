import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Required6000Courses() {
  return (
    <Container
      sx={{
        marginTop: (theme) => theme.spacing(1),
        padding: (theme) => theme.spacing(1),
        marginBottom: (theme) => theme.spacing(1),
      }}
    >
      <Typography variant="h2">6000 Level Required Courses</Typography>
      <Typography>6000 level required courses go here</Typography>
    </Container>
  );
}
