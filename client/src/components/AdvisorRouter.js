import { Switch, Route, Link as RouterLink, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import Planner from "./Planner/Planner";
import QuestionTabs from "./Questions/QuestionTabs";
import initialData from "./Planner/initial-data";
import courses from "../data/ClassInfo.json";
import Link from "@mui/material/Link";
import csvClasses from "../helper/rotationHelper.js";
import getUniqueAfterMerge from "../helper/arrayUtils";

// populate initial data with available classes
for (let i = 0; i < courses.length; i++) {
  const element = courses[i];
  const id = "" + element.courseNum;

  initialData.classes[id] = {
    id: id,
    content: "CS" + id + " - " + element.courseName,
  };
  initialData.columns["available-classes"].taskIds.push(id);
}

const filterClasses = ({ data, setData }) => {
  const cClass = csvClasses();
  let filteredData = { ...initialData };
  const restrictedCourses = courses.filter((c) => c.restricted);
  const restrictedCourseNums = restrictedCourses.map((fc) => "" + fc.courseNum);

  const asArray = Object.entries(initialData.classes);
  filteredData.classes = asArray.filter(
    ([k, v]) => restrictedCourseNums.includes(k) || cClass.includes(k)
  );
  filteredData.classes = Object.fromEntries(filteredData.classes);
  filteredData.columns["available-classes"].taskIds = getUniqueAfterMerge(
    restrictedCourseNums,
    cClass
  );

  console.log(`filteredData`, filteredData);
  setData(filteredData);
};

export default function AdvisorRouter() {
  const [data, setData] = useState(initialData);

  //Filter out courses
  useEffect(() => filterClasses({ data, setData }), []);

  console.log(`data`, data);

  return (
    <Switch>
      <Route path="/planner">
        <Planner data={data} setData={setData} />
      </Route>
      <Route path="/">
        <Link
          display="flex"
          justifyContent="flex-end"
          width="100%"
          component={RouterLink}
          to="/planner"
        >
          Planner
        </Link>
        <QuestionTabs />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
