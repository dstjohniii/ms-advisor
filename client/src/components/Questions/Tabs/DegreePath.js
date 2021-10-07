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
      <Typography>Please select your desired degree path.</Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Degree Path:</FormLabel>
        <RadioGroup defaultValue="traditional" name="type-path-group">
          <FormControlLabel
            value="traditional"
            control={<Radio />}
            label="Traditional"
          />
          <FormControlLabel
            value="professional"
            control={<Radio />}
            label="Professional"
          />
          <FormControlLabel
            value="certificate"
            control={<Radio />}
            label="Certificate"
          />
          </RadioGroup>

          <FormLabel component="legend">Certificate Options:</FormLabel>

            <RadioGroup defaultValue="none" name="type-certificate-group" >
            <FormControlLabel
              value="artificial-intelligence"
              control={<Radio />}
              label="Artificial Intelligence"
            />
            <FormControlLabel
              value="cybersecurity"
              control={<Radio />}
              label="Cybersecurity"
            />
            <FormControlLabel
            value="data-science"
            control={<Radio />}
            label="Data Science"
            />
            <FormControlLabel
              value="internet-and-web"
              control={<Radio />}
              label="Internet and Web"
            />
            <FormControlLabel
              value="mobile-apps-and-computing"
              control={<Radio />}
              label="Mobile Apps and Computing"
            />
            <FormControlLabel              
              value="none"
              control={<Radio />}
              label="None"
            />
          </RadioGroup>          
      </FormControl>
    </Container>
  );
}
