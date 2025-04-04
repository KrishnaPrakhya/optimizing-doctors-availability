import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function cancellation_m({
  id,
  doct_name,
  day,
  slot,
  name,
  waitingTime,
}) {
  const [isDeleted, setIsDeleted] = useState(false);
  const handleDelete = async () => {
    const response = await fetch("/api/deleteSlot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, doct_name, day, slot, name, waitingTime }),
    });
    setOpen(false);
    setIsDeleted(true);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Cancel</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you Sure To cancel The Appointment Slot?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <button
              onClick={handleDelete}
              className="p-2 mr-5 bg-[#00df9a] rounded-md w-20 hover:scale-110 duration-500"
            >
              Yes
            </button>
            <button className="p-2 bg-[#00df9a] rounded-md w-20 hover:scale-110 duration-500">
              No
            </button>
          </Typography>
        </Box>
      </Modal>
      {isDeleted && (
        <div>
          <p>Slot Deleted!</p>
        </div>
      )}
    </div>
  );
}
