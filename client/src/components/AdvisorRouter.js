import { Switch, Route, Link as RouterLink, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import Planner from "./Planner/Planner";
import QuestionTabs from "./Questions/QuestionTabs";
import { getAvailableClasses, csvClasses } from "../helper/rotationHelper.js";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function AdvisorRouter() {
  let tabInfoInitial = {
    degreePath: "traditional",
    certificates: [],
    completed: [],
    restricted: [],
    waived: [],
    transfer: 0,
  };
  const [data, setData] = useState(null);
  const [tabInfo, setTabInfo] = useState(tabInfoInitial);
  const [csvData, setCsvData] = useState(null);
  const [year, setYear] = useState(null);

  //Filter out courses
  useEffect(() => {
    getAvailableClasses().then((data) => setData(data));
    csvClasses().then((data) => setCsvData(data));
  }, []);

  return (
    <Switch>
      <Route path="/planner">
        {data ? (
          <Planner
            data={data}
            setData={setData}
            csvData={csvData}
            tabInfo={tabInfo}
            year={year}
            setYear={setYear}
          />
        ) : null}
      </Route>
      <Route path="/">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
            variant="outlined"
            component={RouterLink}
            to="/planner"
          >
            Course Planning
          </Button>
        </Box>
        <QuestionTabs
          tabInfo={tabInfo}
          setTabInfo={setTabInfo}
          csvData={csvData}
        />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
