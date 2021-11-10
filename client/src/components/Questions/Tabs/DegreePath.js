import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { useEffect } from "react";
import certificates from "../../../data/Certificates.json";

export default function DegreePath({ tabInfo, setTabInfo }) {
  const handleChangeCert = (e) => {
    if (e.target.checked) {
      let newArray = tabInfo.certificates.slice();
      newArray.push(e.target.value);
      const newTabInfo = {...tabInfo, certificates: newArray};
      setTabInfo(newTabInfo);
    } else {
      let newArray = tabInfo.certificates.slice();
      let filteredArray = newArray.filter(item => item !== e.target.value);
      const newTabInfo = {...tabInfo, certificates: filteredArray};
      setTabInfo(newTabInfo);
    }
  }

  const handleChangeDeg = (e) => {
    const newTabInfo = {...tabInfo, degreePath: e.target.value};
    setTabInfo(newTabInfo);
  }

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log("checkedItemsDegPath: ", tabInfo);
    }
  }, [tabInfo]);

  const error = tabInfo.degreePath === "certificate" && tabInfo.certificates.length < 1;

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
        <FormLabel component="legend">Degree Path:</FormLabel>
        <RadioGroup defaultValue="traditional" name="type-path-group">
          <FormControlLabel
            value="traditional"
            checked={tabInfo.degreePath === "traditional"}
            control={<Radio onChange={handleChangeDeg}/>}
            label="Traditional"
          />
          <FormControlLabel
            value="professional"
            checked={tabInfo.degreePath === "professional"}
            control={<Radio onChange={handleChangeDeg}/>}
            label="Professional"
          />
          <FormControlLabel
            value="certificate"
            checked={tabInfo.degreePath === "certificate"}
            control={<Radio onChange={handleChangeDeg}/>}
            label="Certificate"
          />
        </RadioGroup>
      <FormControl
        required={tabInfo.degreePath === "certificate"}
        error={error}
        component="fieldset"
        variant="standard"
      >
        <FormLabel component="legend">Certificate Options:</FormLabel>

        <FormGroup>
          {certificates.map((item) => {
            let checked = tabInfo.certificates.includes(item.value);

            return (
              <FormControlLabel
                key={item.value}
                component={'span'}
                label={item.label}
                control={
                  <Checkbox
                    checked={checked}
                    value={item.value}
                    onChange={handleChangeCert}
                  />}
              />
            );
          })}
        </FormGroup>
        {error &&
        <FormHelperText>Please select at least one certificate</FormHelperText>
        }
      </FormControl>
      <br></br>
      <br></br>
      <Typography variant= "h5" display = "block"> Additional information can be found here:</Typography>
      <Typography variant = "overline" display = "block"><Link target = "_blank" href = "http://www.umsl.edu/cmpsci/graduate-studies/graduate-degree-programs.html"> Click here for Graduate Degree Programs</Link></Typography>
      <Typography variant = "overline" display = "block"><Link target = "_blank" href = "http://www.umsl.edu/cmpsci/certificates/graduate-certificates.html"> Click here for Graduate Certificate Rules</Link></Typography>

    </Container>
  );
}
