import { ListItem, ListItemText, ListSubheader, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List"
import { getRequiredCourses } from "../../helper/rotationHelper";
import _union from "lodash/union";

export default function DisplayList(props) {
    return(
			<List sx={{py: 0}}>
					<ListSubheader> {props.subheader}: </ListSubheader>
					{props.displayArray.sort().map((a) => {
							let primary = `Comp Sci ${a}`;
							let isTakenOrPlanned = 
							props.tabInfo.completed.includes(a) || props.plannedCourses.includes(a);
							let color = (isTakenOrPlanned) ? "green" : "red";
							return(
							<ListItem sx={{py: 0}}>
									<ListItemText sx={{py: 0, px: 2, color: color}} primary={primary}/> 
							</ListItem>
							);
					})}
			</List>
    );
}