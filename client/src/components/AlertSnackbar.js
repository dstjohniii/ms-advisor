import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertSnackbar({ showSnack, setShowSnack, msg }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnack(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={showSnack} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="warning"
          sx={{ width: "100%", whiteSpace: "pre-line" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
