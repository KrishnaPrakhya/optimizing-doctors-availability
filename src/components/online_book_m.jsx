import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

export default function OnlineBookModal({
  doc_name,
  speciality,
  doc_avail,
  hospital,
  data,
  amt,
}) {
  const [updatedList, setUpdatedList] = useState(data);
  const [slot, setSlot] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [color, setColor] = useState("secondary");
  const [text, setText] = useState("Book Slot");
  const [loading, setLoading] = useState(false);
  const [meet, setMeet] = useState();
  const handleCreateMeeting = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1337/schedule_events",
        {
          participants: [{ email: "trustcureorg@gmail.com" }],
        }
      );

      console.log(response.data);
      setMeet(response.data.events[0].meetLink);
      let updatedData = {
        ...updatedList,
        meetLink: response.data.events[0].meetLink,
      };
      console.log(updatedData);
      setUpdatedList(updatedData);
      console.log(response.data.events[0].meetLink);
      return response.data.events[0].meetLink;
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  const asyncFunction = async () => {
    setText("Slot Booked");
    setLoading(true);

    const main = await handleCreateMeeting();
    console.log(main);
    console.log(main);
    console.log(main);
    console.log(main);
    console.log(main);
    let updatedData = {
      ...updatedList,
      doct_name: doc_name,
      speciality: speciality,
      time: selectedTime,
      hospital: hospital,
      amt: amt,
      meet_link: main,
    };
    console.log("checking");
    console.log(updatedData);
    setUpdatedList(updatedData);

    const i_date = updatedData.selectedDate;
    const dateObject = new Date(i_date);
    const formattedDate = dateObject.toISOString().split("T")[0];

    setTimeout(async () => {
      console.log(updatedData);
      const response = await fetch("/api/onlineBookMain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hospital: updatedData.hospital,
          doct_name: updatedData.doct_name,
          book_type: updatedData.book_type,
          forWhom: updatedData.forWhom,
          name: updatedData.name,
          gender: updatedData.gender,
          Age: updatedData.Age,
          email: updatedData.email,
          time: updatedData.time,
          day: updatedData.bookedDay,
          date: formattedDate,
          amt: updatedData.amt,
          meet_link: updatedData.meet_link,
        }),
      });

      setLoading(false);
    }, 2000);
    navigate("/userInfo", { state: updatedData });
  };

  const handleOpen = () => {
    let time = doc_avail.split(",");
    setSlot(time);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleButtonClick = (time) => {
    setSelectedTime(time);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Book Slot</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Doctor Name:{doc_name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Speciality:{speciality}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Fees: {amt} rupees
          </Typography>
          {slot.map((time, index) => (
            <Button key={index} onClick={() => handleButtonClick(time)}>
              {time}
            </Button>
          ))}
          <Typography>
            Selected Time: {selectedTime ? selectedTime : "No selection"}
          </Typography>
          <Button color={color} onClick={asyncFunction} disabled={loading}>
            {loading ? "Loading..." : text}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
