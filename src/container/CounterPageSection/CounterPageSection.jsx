import React, { useState, useEffect } from "react";
import {
  DisplayCounter,
  DeleteBtn,
  WhatsAppBtn,
  AddAllocations,
} from "../../components/CounterPageComponents";
import { FormInput } from "../../components";
import { baseUrl, Notification, EmptyingAllInputs } from "../../utils";

import {
  Button,
  CircularProgress,
  Backdrop,
  Box,
  Fade,
  Modal,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  DisplayCounterContainer,
  DisplayCounterRow,
  DisplayCounterRightBox,
  DisplayCounterRightIconBox,
} from "./DisplayCounterStyle";
import { ModeEditOutline } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CounterPageSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [counterData, setCounterData] = useState({}); //set api data
  const { id } = useParams();

  const [newCountValue, setNewCountValue] = useState();
  const [newStatus, setNewStatus] = useState(false)
  // Update Counter Data States
  const [open, setOpen] = useState(false); //Modal State
  const [updateCounterForm, setCounterForm] = useState({
    description: "",
    goal: "",
  });

  // Get Counter Data
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${baseUrl}/counter/get/${id}`);
        setCounterData(data.counter);
        setCounterForm({
          description: data.counter.description,
          goal: data.counter.goal,
        });
        console.log(data.counter);
        setLoading(false);
      } catch (error) {
        console.log(error);
        Notification(
          false,
          true,
          "Something went wrong.Please try again later"
        );
        navigate(`/`);
      }

      setLoading(false);
    };
    getData();
  }, [id, navigate]);

  // Counter Update Functions
  const handleCounterUpdateDataChange = (e) => {
    setCounterForm({ ...updateCounterForm, [e.target.name]: e.target.value });
  };

  const updateCounterRequest = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${baseUrl}/counter/update/${id}`,
        updateCounterForm
      );
      console.log(data);
      setCounterData(data.updatedCounter);
      setLoading(false);
      EmptyingAllInputs();
      Notification(true, false, "Goal Updated Successfully");
    } catch (error) {
      Notification(false, true, error.response.data.message);
      setLoading(false);
    }
    setOpen(false);
  };

  const handleCounterUpdatedSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (updateCounterForm.description === "" || updateCounterForm.goal === "") {
      Notification(false, true, "Please enter description and total");
    } else {
      updateCounterRequest();
    }
  };

  const getNewCountValue = (newCount,newStatus) => {
    console.log("this is status on counter page", newCount);

    setNewCountValue(newCount);
    setNewStatus(newStatus)
    console.log("this is status on counter page", newStatus);
  };
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <DisplayCounterContainer>
            <DisplayCounterRow>
              <DisplayCounter
                counterData={counterData}
                newCountValue={newCountValue}
                newStatus={newStatus}
              />
              <DisplayCounterRightBox>
                <DisplayCounterRightIconBox>
                  <span
                    onClick={() => setOpen(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <ModeEditOutline />
                  </span>
                </DisplayCounterRightIconBox>
                <DisplayCounterRightIconBox>
                  <DeleteBtn />
                </DisplayCounterRightIconBox>
                <DisplayCounterRightIconBox>
                  <WhatsAppBtn
                    text={`Please click the link to manage ${counterData.description} counter`}
                  />
                </DisplayCounterRightIconBox>
              </DisplayCounterRightBox>
            </DisplayCounterRow>
          </DisplayCounterContainer>
          <br />
          <br />
          <AddAllocations
            getCountValue={counterData.count}
            getNewCountValue={getNewCountValue}
          />

          {/* Counter Update Modal */}
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
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Edit Your Goal and Description
                </Typography>
                <Divider />
                <Box>
                  <form onSubmit={handleCounterUpdatedSubmit}>
                    <FormInput
                      type="text"
                      name={"description"}
                      label={"Counter description"}
                      value={updateCounterForm.description}
                      onChange={handleCounterUpdateDataChange}
                    />
                    <FormInput
                      type={"number"}
                      name={"goal"}
                      label={"Goal - Desired total count"}
                      value={updateCounterForm.goal}
                      onChange={handleCounterUpdateDataChange}
                    />
                    <br />
                    <Button variant="contained" type="submit">
                      {loading ? (
                        <CircularProgress
                          sx={{ color: "white", width: "20px", height: "20px" }}
                        />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </form>
                </Box>
                <br />
              </Box>
            </Fade>
          </Modal>
        </>
      )}
    </>
  );
};

export default CounterPageSection;
