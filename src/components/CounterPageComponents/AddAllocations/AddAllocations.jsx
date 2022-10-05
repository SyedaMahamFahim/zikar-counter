import React, { useState, useEffect ,useCallback} from "react";
import FormInput from "../../FormInput/FormInput";
import {
  Button,
  CircularProgress,
  Backdrop,
  Box,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import { Notification, baseUrl, EmptyingAllInputs } from "../../../utils";
import axios from "axios";
import AppButton from "../../AppButton/AppButton";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import { Delete } from "@mui/icons-material";

const styles = {
  background: "#effcef",
  padding: "2rem",
  borderRadius: "34px",
};

const allocationStyles = {
  background: "rgb(239, 252, 239)",
  padding: "1rem",
  borderRadius: "10px",
  margin: "1rem",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "center",
  justifyContent: "space-between",
  alignItems: "flex-start",
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AddAllocations = ({ getCountValue, getNewCountValue, getStatus }) => {
  const { id } = useParams();
  // eslint-disable-next-line
  const [newCountValue, setNewCountValue] = useState(getCountValue);
  
  const [updatedStatus, setUpdatedStatus] = useState(getStatus);
  const [open, setOpen] = useState(false);
  const [allocationId, setAllocationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [createAllocationLoading, setCreateAllocationLoading] = useState(false);
  const [form, setForm] = useState({
    reader: "",
    count: "",
  });
  const [allAllocations, setAllAllocations] = useState([]);

  const handleOpen = (id) => {
    setAllocationId(id);
    setOpen(true);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const putRequest = async () => {
    setCreateAllocationLoading(true);

    try {
      const { data } = await axios.put(
        `${baseUrl}/counter/allocation/create/${id}`,
        {
          allocations: [
            {
              reader: form.reader,
              count: parseInt(form.count),
            },
          ],
        }
      );

      setAllAllocations(data.counter.allocations);
      getNewCountValue(data.counter.count, data.counter.isCompleted);
      setUpdatedStatus(data.counter.isCompleted);
      setCreateAllocationLoading(false);
      Notification(true, false, "Count Added to Counter");
      EmptyingAllInputs();
    } catch (error) {
      console.log(error);
      Notification(false, true, error.response.data.message);
      setCreateAllocationLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.reader === "" || form.count === "") {
      Notification(false, true, "Please filled all the fields");
    } else {
      putRequest();
    }
  };

  const deleteAllocation = async (allocationId) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${baseUrl}/counter/allocation/delete/${id}`,
        { allocationId }
      );
      setAllAllocations(data.counter.allocations);
      getNewCountValue(data.counter.count, data.counter.isCompleted);
      setUpdatedStatus(data.counter.isCompleted);

      Notification(true, false, "Reader Deleted Successfully");
    } catch (error) {
      Notification(false, true, error.response.data.message);
    }
    setLoading(false);
    setOpen(false);
  };

  useCallback(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${baseUrl}/counter/get/${id}`);
        setAllAllocations(data.counter.allocations);

        console.log(data.counter);
        setLoading(false);
      } catch (error) {
        console.log(error);
        Notification(
          false,
          true,
          "Something went wrong.Please try again later"
        );
      }

      setLoading(false);
    };
    getData();
  }, [id]);


  
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${baseUrl}/counter/get/${id}`);
        setAllAllocations(data.counter.allocations);

        console.log(data.counter);
        setLoading(false);
      } catch (error) {
        console.log(error);
        Notification(
          false,
          true,
          "Something went wrong.Please try again later"
        );
      }

      setLoading(false);
    };
    getData();

    getNewCountValue(newCountValue, updatedStatus);
    // eslint-disable-next-line
  }, [id]);
  return (
    <>
      <Box style={styles}>
        <Typography
          variant="h5"
          component="h5"
          gutterBottom
          fontWeight="fontWeightBold"
          fontSize={"1.1rem"}
          align="left"
        >
          Add to count
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name={"reader"}
            label={"Reader Name"}
            value={form.reader}
            onChange={handleChange}
          />
          <FormInput
            type={"number"}
            name={"count"}
            label={"Count"}
            value={form.count}
            onChange={handleChange}
          />
          <br />
          <AppButton
            name={"Add"}
            type={"submit"}
            isLoading={createAllocationLoading}
          />
        </form>
      </Box>

      <br />
      <br />
      {allAllocations && allAllocations.length > 0 && (
        <Box>
          {loading ? (
            <CircularProgress />
          ) : (
            <Box>
              <Typography
                variant="h5"
                component="h5"
                gutterBottom
                fontWeight="fontWeightBold"
                fontSize={"1.1rem"}
                align="left"
              >
                All Entries
              </Typography>

              {allAllocations?.map((allocation, index) => {
                return (
                  <Box style={allocationStyles} key={index}>
                    <Box>
                      <Typography variant="p" component="p" fontWeight="bold">
                        {dateFormat(allocation.date, "dddd, mmmm dS, yyyy,")}
                      </Typography>
                      <Typography variant="p" component="p">
                        {allocation.reader}
                      </Typography>
                      <Typography
                        variant="p"
                        component="p"
                        style={{
                          padding: "2px 5px",
                          color: "white",
                          fontWeight: "bold",
                          background: "rgb(128, 215, 133)",
                          display: "inline-block",
                          marginTop: "5px",
                        }}
                      >
                        {allocation.count}
                      </Typography>
                    </Box>
                    <Box>
                      <span
                        onClick={() => handleOpen(allocation._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <Delete />
                      </span>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      )}

      {/* Modal */}
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
          <Box sx={modalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this goal?
            </Typography>

            <br />
            <Button
              variant="contained"
              onClick={() => deleteAllocation(allocationId)}
            >
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

export default AddAllocations;
