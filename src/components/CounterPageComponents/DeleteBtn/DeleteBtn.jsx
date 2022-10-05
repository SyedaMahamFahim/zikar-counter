import React, { useState } from "react";
import { Delete } from "@mui/icons-material";
import { Notification, baseUrl } from "../../../utils";
import {
  Button,
  CircularProgress,
  Backdrop,
  Box,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const DeleteBtn = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${baseUrl}/counter/delete/${id}`);
      Notification(true, false, "Goal Deleted Successfully");
      navigate(`/`);
    } catch (error) {
      Notification(false, true, error.response.data.message);
    }
    setOpen(false);
    setLoading(false);
  };

  return (
    <>
      <span onClick={handleOpen} style={{ cursor: "pointer" }}>
        <Delete />
      </span>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this goal?
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Please confirm that you want to delete the counter. THE COUNTER
              HAS NOT REACHED ITS GOAL, AND YOU WILL NOT BE ABLE TO ACCESS IT
              ONCE DELETED. ARE YOU SURE ?
            </Typography>
            <br />
            <Button variant="contained" onClick={handleDelete}>
              {loading ? (
                <CircularProgress
                  sx={{ color: "white", width: "20px", height: "20px" }}
                />
              ) : (
                "Delete"
              )}
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default DeleteBtn;
