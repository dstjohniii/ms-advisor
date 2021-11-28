import { ListItem, ListItemText, ListSubheader, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List"
import { getElectiveCourses, getRequiredCourses } from "../../helper/rotationHelper";
import DisplayList from "./DisplayList";
import _union from "lodash/union";
import _intersection from "lodash/intersection"
import certificateData from "../../data/Certificates.json"
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';

export default function Checklist({ tabInfo, plannedCourses, csvData }) {
  function getTotalCreditHours() {
    const total = tabInfo.completed.length + plannedCourses.length;
    return total * 3;
  }

  function is6000Satisfied() {
    const courses = _union(tabInfo.completed, plannedCourses);
    return courses.some((v) => v.startsWith('6'));
  }

  let allCore = ["4250", "5130", "5500"];
  let coreCourses = _union(allCore, getRequiredCourses(tabInfo.degreePath, csvData));
  return (
    <Paper
      sx={{
        margin: (theme) => theme.spacing(1),
        width: 300,
        padding: 1,
        overflowY: "scroll",
        paddingTop: 0,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          background: "white",
          padding: 1,
        }}
      > 
      Degree Checklist
      </Typography>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
			<Typography sx={{padding: 1}}>
				Total credit hours: {getTotalCreditHours()} / 30
			</Typography>
      {getTotalCreditHours() >= 30 
        ? <CheckIcon style={{fill: "green"}} /> 
        : <WarningIcon style={{fill: "red"}}/>
      }
      </div>
      <hr/>

      {tabInfo.restricted.length > 0 && 
        <DisplayList 
          tabInfo={tabInfo}
          plannedCourses={plannedCourses}
          subheader={"Restricted Courses"}
          displayArray={tabInfo.restricted}
          total={tabInfo.restricted.length}
        />
      }
      <DisplayList 
        tabInfo={tabInfo}
        plannedCourses={plannedCourses}
        subheader={"Core"}
        displayArray={coreCourses}
        total={
          tabInfo.degreePath === "traditional"
            ? 5
            : 3
        }
      />
      {tabInfo.certificates.map((c) => {
        let certTitle = certificateData
          .filter((a) => a.value === c)
          .map((a) => a.label)[0];
        let reqCourses = getRequiredCourses(c, csvData);
        let eleCourses = getElectiveCourses(c, csvData);
        console.log(c, reqCourses, eleCourses);
        let takenOrPlannedCourses = _union(tabInfo.completed, plannedCourses);
        let tpEleCourses = _intersection(eleCourses, takenOrPlannedCourses);
        let courses = _union(reqCourses, tpEleCourses);
        return (
          <DisplayList
            tabInfo={tabInfo}
            plannedCourses={plannedCourses}
            subheader={`${certTitle} Certificate`}
            displayArray={courses}
            total={4}
          />
        );}
      )}
    </Paper>
  );
}