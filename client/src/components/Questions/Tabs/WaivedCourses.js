import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import courses from "../../../data/ClassInfo.json";
import { getRequiredCourses } from "../../../helper/rotationHelper";
import _union from "lodash/union";

export default function WaivedCourses({ tabInfo, setTabInfo, csvData }) {
  const handleChange = (e) => {
    if (e.target.checked) {
      let newArray = tabInfo.waived.slice();
      newArray.push(e.target.id);
      const newTabInfo = { ...tabInfo, waived: newArray };
      setTabInfo(newTabInfo);
    } else {
      let newArray = tabInfo.waived.slice();
      let filteredArray = newArray.filter((item) => item !== e.target.id);
      const newTabInfo = { ...tabInfo, waived: filteredArray };
      setTabInfo(newTabInfo);
    }
  };

  // gather the required courses depending on degree paths chosen
  let reqCourses = getRequiredCourses(tabInfo.degreePath, csvData);
  tabInfo.certificates.forEach(
    (c) => (reqCourses = _union(reqCourses, getRequiredCourses(c, csvData)))
  );

  // filter the courses to what to display
  const options = courses
    .filter((v) => v.core || reqCourses.includes("" + v.courseNum))
    .map((item) => {
      let label = `${item.subject} ${item.courseNum} - ${item.courseName}`;
      let id = `${item.subject.charAt(0)}${item.courseNum}`;
      let checked = tabInfo.waived.includes(id);

      return (
        <FormControlLabel
          key={id}
          //To supress warnings about <div> cannot appear as a descendant of <p>.
          component={"span"}
          label={label}
          control={
            <Checkbox
              id={id}
              checked={checked}
              value={item}
              onChange={handleChange}
            />
          }
        />
      );
    });

  return (
    <Container
      sx={{
        marginTop: (theme) => theme.spacing(1),
        padding: (theme) => theme.spacing(1),
        marginBottom: (theme) => theme.spacing(1),
      }}
    >
      <Typography variant="h2">Waived Courses</Typography>
      <Typography>
        Select waived courses already completed/in progress
      </Typography>
      <FormGroup>{options}</FormGroup>
    </Container>
  );
}
