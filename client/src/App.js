import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import QuestionTabs from "./components/Questions/QuestionTabs";



function App() {
  return (
    <Container>
      <Paper
        sx={{
          marginTop: (theme) => theme.spacing(1),
          padding: (theme) => theme.spacing(1),
          backgroundColor: (theme) => theme.palette.grey[700],
        }}
      >
        <Paper
          sx={{
            marginTop: (theme) => theme.spacing(1),
            padding: (theme) => theme.spacing(1),
            marginBottom: (theme) => theme.spacing(1),
            backgroundColor: (theme) => theme.palette.background.umslRed,
          }}
        >
          <Typography variant="h1">MS Advisor</Typography>
        </Paper>
        <Paper>
          <QuestionTabs />
        </Paper>
      </Paper>
    </Container>
  );
}

export default App;
