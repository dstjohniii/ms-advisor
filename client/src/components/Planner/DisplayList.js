import { List, ListItem, ListItemText, ListSubheader, Typography } from "@mui/material";
import _union from "lodash/union";
import _intersection from "lodash/intersection";
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from '@mui/material/styles';
import React from "react";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

export default function DisplayList(props) {
  function getCourseCount() {
    const takenOrPlanned = _union(props.tabInfo.completed, props.plannedCourses);
    const courses = _intersection(takenOrPlanned, props.displayArray);
    return courses.length;
  }

  let subheader;
  if (props.isCertificate) {
    subheader =
      <CustomTooltip
        placement="top-start"
        title={
          <div>
            <Typography> Required: </Typography>
            {props.reqCourses.map((a) => {
              return (
                <List dense>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemText sx={{ py: 0 }} primary={`Comp Sci ${a}`} />
                  </ListItem>
                </List>
              )
            })
            }
            <Typography> Electives: </Typography>
            {props.eleCourses.map((a) => {
              return (
                <List dense>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemText sx={{ py: 0 }} primary={`Comp Sci ${a}`} />
                  </ListItem>
                </List>
              )
            })
            }
          </div>
        }
      >
        <ListSubheader> {props.subheader}: {getCourseCount()} / {props.total} </ListSubheader>
      </CustomTooltip>
  } else {
    subheader =
      <ListSubheader> {props.subheader}: {getCourseCount()} / {props.total} </ListSubheader>
  }

  return (
    <List sx={{ py: 0 }}>
      {subheader}
      {props.displayArray.sort().map((a) => {
        let isTakenOrPlanned =
          props.tabInfo.completed.includes(a)
          || props.plannedCourses.includes(a)
          || props.tabInfo.waived.includes(a);
        let color = (isTakenOrPlanned) ? "green" : "red";
        let primary = `Comp Sci ${a}`;
        return (
          <ListItem sx={{ py: 0 }}>
            <ListItemText sx={{ py: 0, px: 2, color: color }} primary={primary} />
            {isTakenOrPlanned
              ? <CheckIcon style={{ fill: "green" }} />
              : <WarningIcon style={{ fill: "red" }} />
            }
          </ListItem>
        );
      })}
    </List>
  );
}