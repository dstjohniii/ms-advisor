import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function DegreePath() {
  return (
    <Container
      sx={{
        marginTop: (theme) => theme.spacing(1),
        padding: (theme) => theme.spacing(1),
        marginBottom: (theme) => theme.spacing(1),
      }}
    >
      <Typography variant="h2">Degree paths</Typography>
      <Typography>certificates and paths go here.</Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Degree Path</FormLabel>
        <RadioGroup defaultValue="traditional" name="radio-buttons-group">
          <FormControlLabel
            value="traditional"
            control={<Radio />}
            label="Traditional"
          />
          <FormControlLabel
            value="certificate"
            control={<Radio />}
            label="Certificate"
          />
          <FormControlLabel
            value="professional"
            control={<Radio />}
            label="Professional"
          />
        </RadioGroup>
      </FormControl>
    </Container>
  );
}
