import React, { useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import M_model from "../n_compo/m_model";
import HospitalCard from "./HospitalCard";
import { Container, Row, Col } from "reactstrap";
import SearchBar from "./SearchBar";
import WaterCard from "./WaterCard";
import SubTitle from "./Subtitle";
import doc1 from "../doc1.jpg";
import "../styles/home.css";
import Services from "./services";
import doc2 from "../doc2.jpg";

function Home({ selectedOptions, updateSelectedOptions }) {
  const [updatedList, setUpdatedOptions] = useState(selectedOptions);
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  async function bookRemind(name) {
    const req = await fetch("/api/bookRemind", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await req.json();
    const bookingsCount = data.data;
    setCount(bookingsCount);

    if (bookingsCount > 0) {
      setShowModal(true);
    }
  }

  async function populateQuote() {
    const req = await fetch("http://localhost:1337/api/", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    console.log(data);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.removeItem("token");
    } else {
      const userName = token
        ? JSON.parse(atob(token.split(".")[1])).email
        : null;

      let updatedData = { ...updatedList, email: userName };
      setUpdatedOptions(updatedData);

      if (updatedData.email !== selectedOptions.email) {
        updateSelectedOptions(updatedData);
      }

      populateQuote();
      bookRemind(userName);
    }
  }, [navigate, selectedOptions.email]);

  document.title = "Home";

  const handleCloseModal = () => {
    setShowModal(false);
  };
  document.title = "Home";
  const dynamicStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100px",
  };
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <SubTitle subtitle={"Know Before You Go"} />
                </div>
                <h1>
                  Book Your Doctor <span className="highlight">With Us</span>
                </h1>
                <p className="text-2xl mr-3" style={{ textAlign: "justify" }}>
                  Experience a new era in healthcare efficiency with our
                  comprehensive suite of solutions dedicated to optimizing
                  doctors' availability.Say goodbye to long wait times and hello
                  to a healthcare experience where access to quality care is
                  prioritized and optimized at every step.
                </p>
                <button
                  className="p-3 mt-4 text-white text-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-blue-500 font-bold rounded-md shadow-md hover:to-yellow-500 hover:scale-110 hover:duration-100"
                  onClick={() => navigate("/book-appointment")}
                >
                  Book Now
                </button>
              </div>
            </Col>
            <Col lg="3">
              <div className="hero__img-box">
                <img src={doc1} />
              </div>
            </Col>
            <Col lg="3">
              <div className="hero__img-box mt-4">
                <img src={doc2} />
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <HospitalCard />
          </Row>
          <Row className="mt-4 invisible-md">
            <WaterCard />
          </Row>
          <Row className="mt-4 invisible-md">
            <Services />
          </Row>
        </Container>
        {showModal && count > 0 && (
          <Modal open={showModal} onClose={handleCloseModal}>
            <div
              className="modal-content"
              style={{
                backgroundColor: "#f5f5f5",
                borderRadius: "5px",
                padding: "10px 15px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
                position: "fixed",
                top: "80px",
                right: "10px",
                minWidth: "150px",
                maxWidth: "250px",
              }}
            >
              <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
                You have {count} pending slots booked.
              </p>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => {
                  navigate("/recBook");
                }}
              >
                View Bookings
              </Button>
            </div>
          </Modal>
        )}
      </section>
    </>
  );
}

export default Home;
