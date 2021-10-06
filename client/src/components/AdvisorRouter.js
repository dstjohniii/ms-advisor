import { Switch, Route, Link as RouterLink, Redirect } from "react-router-dom";
import Planner from "./Planner/Planner";
import QuestionTabs from "./Questions/QuestionTabs";

import Link from "@mui/material/Link";
export default function AdvisorRouter() {
  return (
    <Switch>
      <Route path="/planner">
        <Planner />
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
