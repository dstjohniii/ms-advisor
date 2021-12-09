import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function InstructionModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Instructions
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This page is grouped into three sections.
            <br />
            <br />
            On the left you see Available Classes. Here you will see all the
            available classes you can take for a given semester. Hovering over
            these classes will give a brief description about them. When you
            left click you are able to drag the classes to the semesters that
            are highlighted green. It is suggested that you start with a 6000
            level course.
            <br />
            <br />
            In the middle you see numerous semesters that you can add courses
            to. You can add or remove a year to the end of the list of semesters
            by pressing the plus or minus buttons at the top.
            <br />
            <br />
            On the right side you see a degree checklist. This shows what is
            needed for the path you choice in the questions page previously. To
            see which elective are associated to each certificate, hover over
            the subheader of the certificate and you should see a tooltip. Once
            there is no red and everything is checked you are done planning.
            <br />
            <br />
            To see this message again press the instructions at the top left of
            the page.
            <br />
            <br />
            To return to the questions page click the questions label in the
            bread crumbs at the top left of the page.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
