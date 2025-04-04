import React, { useEffect, useState } from "react";
import { Button, Modal, CircularProgress } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "./Navbar";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import Online_book_m from "./online_book_m";

function On_cons2() {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [day, setDay] = useState("");
  const [docData, setDocData] = useState([]);
  const [updatedList, setUpdatedList] = useState(null);

  const handleDay = async (selectedDay) => {
    setDay(selectedDay);
    let updatedData = {
      ...updatedList,
      bookedDay: selectedDay,
      selectedDate: selectedDate,
    };
    console.log(updatedData);
    setUpdatedList(updatedData);
    console.log(updatedData);
    console.log(updatedList);
    await displayDoc(selectedDay);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = token ? JSON.parse(atob(token.split(".")[1])).email : null;

    console.log(email);
    const asyncFn = async () => {
      const response = await fetch("/api/refBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setUpdatedList(data.data || {});
      console.log(data);
    };
    asyncFn();
  }, []);

  async function displayDoc(day) {
    try {
      setLoading(true);
      let speciality = updatedList ? updatedList.speciality : null;
      console.log(speciality);
      const response = await fetch("/api/bookOnline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ day: day, speciality: speciality }),
      });
      const data = await response.json();
      console.log(data.doc_list);
      setDocData(data.doc_list);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const today = new Date();
  const nextFiveDays = new Date(today);
  nextFiveDays.setDate(today.getDate() + 5);

  return (
    <>
      <Navbar />
      <div className="ml-5">
        <h1 className=" mt-4 text-3xl font-bold text-[rgb(40,48,115)] ">
          Online Booking
        </h1>
        <br />
        <h2>Select a date from today to the next five days:</h2>
        <span>Selected Date: </span>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            const dayName = date.toLocaleDateString("en-US", {
              weekday: "long",
            });
            handleDay(dayName);
          }}
          minDate={today}
          maxDate={nextFiveDays}
          dateFormat="MMMM d, yyyy"
        />
        <div className="">
          <div>
            <h1 className="text-3xl font-bold mt-4 mb-3 text-[rgb(40,48,115)] ">
              Available Doctor List
            </h1>
          </div>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Doctor Name</TableCell>
                <TableCell align="center">Speciality</TableCell>
                <TableCell align="center">Available Slots</TableCell>
                <TableCell align="center">Book Appointment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                docData.map((doctor, index) => (
                  <TableRow key={index}>
                    <TableCell>{doctor.doc_name}</TableCell>
                    <TableCell align="center">{doctor.speciality}</TableCell>
                    <TableCell align="center">
                      {doctor.availability
                        ? doctor.availability
                        : "No Slot Available"}
                    </TableCell>
                    <TableCell align="center">
                      {doctor.availability ? (
                        <Online_book_m
                          doc_name={doctor.doc_name}
                          speciality={doctor.speciality}
                          doc_avail={doctor.availability}
                          hospital={doctor.hospital}
                          data={updatedList}
                          amt={doctor.amt}
                        />
                      ) : (
                        <Button disabled>No Slots</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default On_cons2;
