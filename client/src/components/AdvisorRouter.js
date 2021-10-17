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
  const id = String(element.courseNum);

  initialData.classes[id] = {
    id: id,
    content: "CS" + id + " - " + element.courseName,
  };
  initialData.columns["available-classes"].taskIds.push(id);
}

const filterClasses = async () => {
  const cClass = await csvClasses();
  const filteredData = { ...initialData };
  const restrictedCourses = courses.filter((c) => c.restricted);
  const restrictedCourseNums = restrictedCourses.map((fc) =>
    String(fc.courseNum)
  );

  filteredData.classes = Object.entries(initialData.classes).reduce(
    (acc, [k, v]) => {
      if (restrictedCourseNums?.includes(k) || cClass?.includes(k)) {
        return { ...acc, [k]: v };
      }
      return acc;
    },
    {}
  );
  filteredData.columns["available-classes"].taskIds = getUniqueAfterMerge(
    restrictedCourseNums,
    cClass
  );
  return filteredData;
};

export default function AdvisorRouter() {
  const [data, setData] = useState(null);

  //Filter out courses
  useEffect(() => {
    filterClasses().then((data) => setData(data));
  }, []);

  return (
    <Switch>
      <Route path="/planner">
        {data ? <Planner data={data} setData={setData} /> : null}
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
