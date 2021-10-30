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
import Required6000Courses from "./Tabs/Required6000Courses";

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

export default function QuestionTabs() {
  const [value, setValue] = useState(0);
  const [compCourses, setCompCourses] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Instructions" {...a11yProps(0)} />
          <Tab label="Degree Paths" {...a11yProps(1)} />
          <Tab label="Restricted Courses" {...a11yProps(2)} />
          <Tab label="Completed Courses" {...a11yProps(3)} />
          <Tab label="Waived Courses" {...a11yProps(4)} />
          <Tab label="6000 Level Required Courses" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Instructions />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DegreePath />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RestrictedCourses />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CompletedCourses compCourses={compCourses} setCompCourses={setCompCourses}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <WaivedCourses />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Required6000Courses />
      </TabPanel>
    </Box>
  );
}
