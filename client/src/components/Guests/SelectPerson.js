import React, { useState } from "react";
import style from "./SelectPerson.module.css";
import Select from "../Select/Select";

function SelectPerson({
  setGuestsParent,
  setRoomsParent,
  setIsDoneParent,
  setIsCliked,
  roomsParent,
  guestsParent,
}) {
  // const [guests, setGuests] = useState(1);
  // const [rooms, setRooms] = useState(1);

  const sendDataToParent = () => {
    setGuestsParent(guestsParent);
    setRoomsParent(roomsParent);
    setIsDoneParent((isDoneParent) => !isDoneParent);
    setIsCliked((isClicked) => !isClicked);
  };

  return (
    <section className={style.card}>
      <h3>Select</h3>
      <Select
        label="Guests"
        selected={guestsParent}
        setSelected={setGuestsParent}
      />
      <Select
        label="Rooms"
        selected={roomsParent}
        setSelected={setRoomsParent}
      />
      <button className={style.DoneButton} onClick={sendDataToParent}>
        Done
      </button>
    </section>
  );
}

export default SelectPerson;
