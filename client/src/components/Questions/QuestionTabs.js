import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Instructions from "./Tabs/Instructions";
import RestrictedCourses from "./Tabs/RestrictedCourses";
import DegreePath from "./Tabs/DegreePath";
import CompletedCourses from "./Tabs/CompletedCourses";
import WaivedCourses from "./Tabs/WaivedCourses";
import TransferCredits from "./Tabs/TransferCredits";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: "0.5rem" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function QuestionTabs({
  tabInfo,
  setTabInfo,
  csvData,
  courseCredits,
  setCourseCredits,
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Instructions" {...a11yProps(0)} />
          <Tab label="Degree Paths" {...a11yProps(1)} />
          <Tab label="Restricted Courses" {...a11yProps(2)} />
          <Tab label="Completed Courses" {...a11yProps(3)} />
          <Tab label="Waived Courses" {...a11yProps(4)} />
          <Tab label="Transfer Credits" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Instructions />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DegreePath tabInfo={tabInfo} setTabInfo={setTabInfo} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RestrictedCourses tabInfo={tabInfo} setTabInfo={setTabInfo} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CompletedCourses
          tabInfo={tabInfo}
          setTabInfo={setTabInfo}
          courseCredits={courseCredits}
          setCourseCredits={setCourseCredits}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <WaivedCourses
          tabInfo={tabInfo}
          setTabInfo={setTabInfo}
          csvData={csvData}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <TransferCredits tabInfo={tabInfo} setTabInfo={setTabInfo} />
      </TabPanel>
    </Box>
  );
}
