import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import UseApi from "../../hookes/useApi";
import { useNavigate } from "react-router-dom";

const DeleteHotelModal = ({
  open,
  handleClose,
  selectedRowData,
  setSuccessDelete,
  hotelPage,
  forWhat,
}) => {
  const { apiCall, loading, error } = UseApi();
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await apiCall({
        url: "/hotel",
        method: "delete",
        data: {
          id: selectedRowData && selectedRowData.id,
        },
      });
      if (hotelPage) {
        navigate("/hotel");
      }
      setSuccessDelete(true);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setSuccessDelete(false);
      }, 20000);
      handleClose();
    }
  };

  const handleDeleteImage = async () => {
    await apiCall({
      url: "/hotel/image",
      method: "delete",
      data: {
        id: selectedRowData && selectedRowData.id,
      },
    });
    setSuccessDelete(true);
    setTimeout(() => {
      setSuccessDelete(false);
    }, 20000);
    handleClose();
  };

  const handleDeleteRule = async (e) => {
    e.preventDefault();
    await apiCall({
      url: "/rule",
      method: "delete",
      data: {
        id: selectedRowData && selectedRowData.id,
      },
    });
    setSuccessDelete(true);
    setTimeout(() => {
      setSuccessDelete(false);
    }, 20000);
    handleClose();
  };

  const handleDeleteRate = async (e) => {
    e.preventDefault();
    await apiCall({
      url: "/rating",
      method: "delete",
      data: {
        id: selectedRowData && selectedRowData.id,
      },
    });
    setSuccessDelete(true);
    setTimeout(() => {
      setSuccessDelete(false);
    }, 20000);
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (forWhat === "hotel") {
      handleDelete(e);
    } else if (forWhat === "hotelImage") {
      handleDeleteImage(e);
    } else if (forWhat === "rule") {
      handleDeleteRule(e);
    } else if (forWhat === "rate") {
      handleDeleteRate(e);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30rem",
    bgcolor: "white",
    border: "2px solid #171B24",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
  };

  const divStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "25rem",
    paddingBottom: "1rem",
  };

  const span = {
    display: "flex",
    alignItems: "center",
    color: "white",
    padding: 0,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={divStyle}>
            <Typography
              variant="h5"
              component="h5"
              sx={{
                color: "#088395 !important",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Alert
            </Typography>
            <IconButton
              style={span}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon
                sx={{
                  color: "#088395",
                }}
              />
            </IconButton>
          </div>
          <Typography
            variant="p"
            component="p"
            fontSize="1.3rem"
            sx={{
              mb: "2rem",
              mt: "1.5rem",
            }}
          >
            {forWhat === "hotel"
              ? "Are you sure you want to delete this hotel?"
              : forWhat === "hotelImage"
              ? "Are you sure you want to delete this image?"
              : forWhat === "rule"
              ? "Are you sure you want to delete this Rule?"
              : forWhat === "rate"
              ? "Are you sure you want to delete this Rate?"
              : ""}
          </Typography>
          {forWhat === "hotelImage" ? (
            <img
              src={`${process.env.REACT_APP_SQL_API}/${
                selectedRowData && selectedRowData.icon
              }`}
              alt="previousImage"
              width="100%"
            />
          ) : (
            ""
          )}
          <span
            style={{
              display: "flex",
              marginTop: "2rem",
            }}
            onClick={(e) => handleSubmit(e)}
          >
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              size="large"
              sx={{
                bgcolor: "#088395 !important",
              }}
              onClick={(e) => handleSubmit(e)}
            >
              Delete
            </Button>
          </span>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteHotelModal;
