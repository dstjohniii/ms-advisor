import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import {
  getElectiveCourses,
  getRequiredCourses,
} from "../../helper/rotationHelper";
import DisplayList from "./DisplayList";
import _union from "lodash/union";
import _intersection from "lodash/intersection";
import certificateData from "../../data/Certificates.json";
import CheckIcon from "@mui/icons-material/Check";
import WarningIcon from "@mui/icons-material/Warning";

const TOTAL_CREDIT_HOURS = 30;

export default function Checklist({
  tabInfo,
  plannedCourses,
  csvData,
  courseCredits,
}) {
  function getTotalCreditHours() {
    let total = 0;
    Object.entries(courseCredits).forEach((c) => (total += c[1]));
    return total + tabInfo.transfer;
  }

  let allCore = ["4250", "5130", "5500"];
  let coreCourses = _union(
    allCore,
    getRequiredCourses(tabInfo.degreePath, csvData)
  );
  let takenOrPlannedCourses = _union(tabInfo.completed, plannedCourses);
  let courses6000 = takenOrPlannedCourses.filter((c) => c.startsWith("6"));

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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography sx={{ padding: 1 }}>
          Total credit hours: {getTotalCreditHours()} / {TOTAL_CREDIT_HOURS}
        </Typography>
        {getTotalCreditHours() >= 30 ? (
          <CheckIcon style={{ fill: "green" }} />
        ) : (
          <WarningIcon style={{ fill: "red" }} />
        )}
      </div>
      <hr />

      <DisplayList
        tabInfo={tabInfo}
        plannedCourses={plannedCourses}
        subheader={"6000 Level Course"}
        displayArray={courses6000}
        total={1}
      />

      {tabInfo.restricted.length > 0 && (
        <DisplayList
          tabInfo={tabInfo}
          plannedCourses={plannedCourses}
          subheader={"Restricted Courses"}
          displayArray={tabInfo.restricted}
          total={tabInfo.restricted.length}
        />
      )}
      <DisplayList
        tabInfo={tabInfo}
        plannedCourses={plannedCourses}
        subheader={"Core"}
        displayArray={coreCourses}
        total={
          tabInfo.degreePath === "traditional"
            ? 5
            : tabInfo.degreePath === "professional"
            ? 4
            : 3
        }
      />
      {tabInfo.certificates.map((c) => {
        let certTitle = certificateData
          .filter((a) => a.value === c)
          .map((a) => a.label)[0];
        let reqCourses = getRequiredCourses(c, csvData);
        let eleCourses = getElectiveCourses(c, csvData);
        let tpEleCourses = _intersection(eleCourses, takenOrPlannedCourses);
        let courses = _union(reqCourses, tpEleCourses);
        return (
          <DisplayList
            tabInfo={tabInfo}
            plannedCourses={plannedCourses}
            subheader={`${certTitle}`}
            displayArray={courses}
            total={4}
            isCertificate={true}
            reqCourses={reqCourses}
            eleCourses={eleCourses}
          />
        );
      })}
    </Paper>
  );
}
