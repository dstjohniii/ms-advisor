import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import courses from "../data/ClassInfo.json";

export default function CreditDialog({
  open,
  setOpen,
  courseCredits,
  setCourseCredits,
}) {
  const [creditValue, setcreditValue] = useState(0);

  const credit = courses.filter((c) => String(c.courseNum) === String(open))[0]
    ?.credits;

  const creditSplit = credit?.split("-");
  const lowCredit = creditSplit ? Number(creditSplit[0]) : 0;
  const highCredit = creditSplit ? Number(creditSplit[1]) : 3;

  const handleCreditUpdate = () => {
    let tempValue = creditValue;
    if (tempValue === "" || tempValue === 0) tempValue = lowCredit;
    let tempCredits = {
      ...courseCredits,
      [open]: tempValue,
    };
    setCourseCredits(tempCredits);
    setOpen(false);
  };
  const handleChange = (e) => {
    if (e.target.value !== "" && Number(e.target.value) < lowCredit)
      e.target.value = lowCredit;
    if (Number(e.target.value) > highCredit) e.target.value = highCredit;
    setcreditValue(Number(e.target.value));
  };

  return (
    <div>
      <Dialog open={open} disableBackdropClick="true">
        <DialogTitle>Select Number of Credits</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              marginBottom: 1.5,
            }}
          >
            Select between {credit} credit hours you expect to or have already
            received for this course.
          </DialogContentText>
          <TextField
            id="credits"
            label="# of Credits"
            type="number"
            defaultValue={lowCredit}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreditUpdate}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
