import { ListItem, ListItemText, ListSubheader, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List"
import { getRequiredCourses } from "../../helper/rotationHelper";
import _union from "lodash/union";
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';

export default function DisplayList(props) {
    return(
			<List sx={{py: 0}}>
					<ListSubheader> {props.subheader}: </ListSubheader>
					{props.displayArray.sort().map((a) => {
							let isTakenOrPlanned = 
								props.tabInfo.completed.includes(a) || props.plannedCourses.includes(a);
							let color = (isTakenOrPlanned) ? "green" : "red";
							let primary = `Comp Sci ${a}`;
							return(
							<ListItem sx={{py: 0}}>
									<ListItemText sx={{py: 0, px: 2, color: color}} primary={primary}/> 
									{isTakenOrPlanned 
										? <CheckIcon style={{fill: "green"}} /> 
										: <WarningIcon style={{fill: "red"}}/>
									}
							</ListItem>
							);
					})}
			</List>
    );
}