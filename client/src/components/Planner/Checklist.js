import { ListItem, ListItemText, ListSubheader, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List"
import { getRequiredCourses } from "../../helper/rotationHelper";
import DisplayList from "./DisplayList";
import _union from "lodash/union";
import certificateData from "../../data/Certificates.json"

export default function Checklist({ tabInfo, plannedCourses, csvData }) {
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
			<Typography sx={{padding: 1}}>
				Total completed courses: {tabInfo.completed.length * 3} / 30
			</Typography>
      <hr/>
      {tabInfo.restricted.length > 0 && 
        <DisplayList 
          tabInfo={tabInfo}
          plannedCourses={plannedCourses}
          subheader={"Restricted Courses"}
          displayArray={tabInfo.restricted}
        />
      }
      <DisplayList 
        tabInfo={tabInfo}
        plannedCourses={plannedCourses}
        subheader={"Core"}
        displayArray={coreCourses}
      />
      {tabInfo.certificates.map((c) => {
        let reqCourses = getRequiredCourses(c, csvData);
        let certTitle = certificateData
          .filter((a) => a.value === c)
          .map((a) => a.label)[0];
        return (
          <DisplayList
            tabInfo={tabInfo}
            plannedCourses={plannedCourses}
            subheader={`${certTitle} Certificate`}
            displayArray={reqCourses}
          />
        );}
      )}
    </Paper>
  );
}