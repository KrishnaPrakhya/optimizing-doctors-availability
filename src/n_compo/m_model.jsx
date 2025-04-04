import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.2, delay: 0.2, ease: "easeOut" },
  },
  titleScale: {
    y: 0,
    scale: 1.1,
    transition: { duration: 0.4, delay: 0.8, ease: "easeOut" },
  },
  typeFade: { opacity: 1, transition: { duration: 0.8, delay: 1.2 } },
  buttonSlide: { x: 0, opacity: 1, transition: { duration: 0.6, delay: 1.6 } },
};
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
export default function M_model() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    let user = localStorage.getItem("token");
    if (user) {
      navigate("/home");
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <motion.button
        className={`bg-[rgb(40,48,115)] w-[200px] rounded-md font-medium px-6 mx-auto py-3 mt-3`}
        variants={variants}
        initial="hidden"
        animate="buttonSlide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleOpen}
      >
        BOOK NOW
      </motion.button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Hey!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please can you login/Register to Continue
          </Typography>
          <div className="flex flex-row mt-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                navigate("/login");
              }}
              className="bg-[rgb(40,48,115)] w-[100px] col-6 rounded-md font-medium px-6 mx-auto  py-3 text-white mt-3"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                navigate("/register");
              }}
              className="bg-[rgb(40,48,115)]  w-[100px] col-6 rounded-md font-medium px-6 mx-auto py-3 text-white mt-3 mr=5"
            >
              Register
            </motion.button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
