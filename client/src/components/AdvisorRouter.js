import { Switch, Route, Link as RouterLink, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import Planner from "./Planner/Planner";
import QuestionTabs from "./Questions/QuestionTabs";
import Link from "@mui/material/Link";
import { getAvailableClasses } from "../helper/rotationHelper.js";

export default function AdvisorRouter() {
  const [data, setData] = useState(null);
  const [compCourses, setCompCourses] = useState({});

  //Filter out courses
  useEffect(() => {
    getAvailableClasses().then((data) => setData(data));
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
        <QuestionTabs 
          compCourses={compCourses} 
          setCompCourses={setCompCourses}
        />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
