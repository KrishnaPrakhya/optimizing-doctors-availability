import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Avatar,
  Tab,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function ForWhom({ selectedOptions, updateSelectedOptions }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/book-appointment");
  };

  const namePage = (forWhom) => {
    const updatedOptions = { ...selectedOptions, forWhom: forWhom };
    updateSelectedOptions(updatedOptions);
    navigate("/name");

    console.log(updatedOptions);
  };

  return (
    <Grid
      className=""
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} md={6}>
        <Card
          elevation={4}
          className="p-5"
          style={{ backgroundColor: "white" }}
        >
          <CardContent align="center">
            <Typography className="text-[rgb(40,48,115)]" variant="h4" sx={{ mb: 2 }}>
              For Whom the appointment is For?
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: "rgb(40,48,115) " }}
                  size="large"
                  onClick={() => namePage("FOR ME")}
                >
                  <Box display="flex" alignItems="center">
                    <Avatar
                      style={{ backgroundColor: "#000000" }}
                      src="YOUR_IMAGE_SRC_HERE"
                      sx={{ mr: 2 }}
                    />
                    <Typography className="text-white" variant="h6">
                      FOR ME
                    </Typography>
                  </Box>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: "rgb(40,48,115)" }}
                  color="secondary"
                  size="large"
                  onClick={() => namePage("SOMEONE ELSE")}
                >
                  <Box display="flex" alignItems="center">
                    <Avatar
                      style={{ backgroundColor: "#000000" }}
                      src="YOUR_IMAGE_SRC_HERE"
                      sx={{ mr: 2 }}
                    />
                    <Typography className="text-white" variant="h6">
                      SOMEONE ELSE
                    </Typography>
                  </Box>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: "rgb(40,48,115)" }}
                  color="secondary"
                  size="large"
                  onClick={() => {
                    navigate("/otherProfile");
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Avatar
                      style={{ backgroundColor: "#000000" }}
                      src="YOUR_IMAGE_SRC_HERE"
                      sx={{ mr: 2 }}
                    />
                    <Typography className="text-white" variant="h6">
                      Profiles
                    </Typography>
                  </Box>
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              style={{ color: "white", fontFamily:"cursive" ,backgroundColor: "rgb(40,48,115)" }}
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ForWhom;
