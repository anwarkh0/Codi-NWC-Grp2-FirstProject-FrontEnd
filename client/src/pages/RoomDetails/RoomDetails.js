import { useState } from "react";
import ReservationModal from "../../components/Booking/BookingDetails";

const RoomDetails = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        onClick={handleOpen}
      >
        Reserve
      </button>
      {open && <ReservationModal open={open} handleClose={handleClose} />}
    </>
  );
};
