// import React from "react";
import { Button, Typography, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

// import { Outlet } from "react-router-dom"

// import Layout from "./Layout"
function Info() {
  const navigate = useNavigate();

  const redirectToNamePage = () => {
    navigate("/forWhom");
  };

  return (
    // <>
    // <Outlet/>
    // </>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <Card
        className="container"
        style={{
          backgroundColor: "white",
          width: "70%",
          padding: "20px",
          textAlign: "left",
        }}
      >
        <CardContent>
          <Typography
            className="text-[rgb(40,48,115)]"
            variant="h4"
            gutterBottom
          >
            Doctor Adviser Form
          </Typography>
          <Typography
            className="text-[rgb(40,48,115)]"
            variant="body1"
            paragraph
          >
            Take a short (3 min) symptom assessment. The information you provide
            is safe and won’t be shared. Your results will include:
          </Typography>
          <ul>
            <li>
              <Typography className="text-[rgb(40,48,115)]">
                1) Recommended consultation of doctors.
              </Typography>
            </li>
            <li>
              <Typography className="text-[rgb(40,48,115)]">
                2) Recommendations on what to do next.
              </Typography>
            </li>
          </ul>
          <Typography
            className="mt-3 text-[[rgb(40,48,115)]]"
            variant="h4"
            gutterBottom
          >
            Point to be Stated
          </Typography>
          <p className="text-[rgb(40,48,115)]">
            <Typography>
              Remember, a symptom checker serves as a helpful tool but should
              not replace professional medical advice. It should complement
              medical consultation and aid users in understanding potential
              health concerns. Always encourage users to consult with healthcare
              professionals for accurate diagnosis and treatment.
            </Typography>
          </p>
          <Button
            onClick={redirectToNamePage}
            variant="contained"
            style={{ backgroundColor: "rgb(40,48,115)", color: "white" }}
            className="mt-4"
          >
            Next
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Info;
