import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { color } from "@mui/system";
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

export default function BasicModal({
  stateObj,
  name,
  hospital,
  time,
  slot,
  amt,
  desc,
}) {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(null);
  const [slotTime, setSlotTime] = useState([]);
  const [updatedList, setUpdatedList] = useState(stateObj);
  const [open, setOpen] = React.useState(false);
  const [docStatus, setDocStatus] = useState("");
  const [status, setStatus] = useState("success");
  const [book, setBook] = useState("Book Appointment");
  const [finalData, setFinalData] = useState();
  const handleOpen = async () => {
    setOpen(true);
    console.log(name);
    const docAttendance = await fetch("/api/docAttendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doc_name: name,
      }),
    });
    const status = await docAttendance.json();
    setDocStatus(status.status);
    let time = slot.split(",");
    setSlotTime(time);
  };
  const handleClose = () => setOpen(false);
  const handleClick = async () => {
    let final_options = {
      ...updatedList,
      doct_name: name,
      hospital: hospital,
      time: time,
      slot: slot,
      booked_time: selectedTime,
      amt: amt,
    };
    console.log(time);
    console.log(slot);
    console.log(final_options.booked_time);
    console.log(final_options.amt);
    console.log("heyy!");
    console.log(final_options);
    setUpdatedList(final_options);
    console.log(final_options);
    console.log(stateObj);
    console.log(updatedList);
    setBook("Appointment Booked");
    setStatus("secondary");
    const response = fetch("/flask/amg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        hospital: hospital,
        department: stateObj.speciality,
        data: stateObj.symptoms,
      }),
    });
    setFinalData(final_options);
    const response_mongo = await fetch("/api/slotPage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hospital: final_options.hospital,
        doct_name: final_options.doct_name,
        book_type: final_options.book_type,
        forWhom: final_options.forWhom,
        name: final_options.name,
        gender: final_options.gender,
        Age: final_options.Age,
        symptoms: final_options.symptoms,
        email: final_options.email,
        slot: final_options.booked_time,
        time: final_options.time,
        day: final_options.dayName,
        amt: final_options.amt,
      }),
    });
  };
  const handleNext = () => {
    navigate("/userInfo", { state: finalData });
  };
  return (
    <div>
      <Button disabled={slot === "nan" ? true : false} onClick={handleOpen}>
        BOOK NOW
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {name}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {hospital}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {desc}
          </Typography>
          {/* {slot.map((element, index) => (
            <Button key={index}>{element}</Button>
          ))} */}
          {slotTime.map((time, index) => (
            <Button
              onClick={() => {
                setSelectedTime(time);
              }}
              key={index}
            >
              {time}
            </Button>
          ))}
          <p>Selected Time: {selectedTime}</p>
          <p>Doctor Consultation Fee: {amt} rs/-</p>
          <Button
            disabled={docStatus !== "present"}
            onClick={handleClick}
            className="mt-5 m-2"
            variant="contained"
            color={status}
          >
            {book}
          </Button>
          <Button
            onClick={handleNext}
            className="mt-5 m-2"
            variant="contained"
            color="success"
          >
            Confirm Booking
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
