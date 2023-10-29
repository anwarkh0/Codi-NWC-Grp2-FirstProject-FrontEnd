import React from "react";
import serviceCardModule from "../styles/serviceCard.module.css";

function ServiceCard(props) {
  const { icon, text } = props;
  return (
    <div className={serviceCardModule.card}>
      <img className="serviceIcon" src={icon} alt="service icon" />
      <p className="iconDesc">{text}</p>
    </div>
  );
}

export default ServiceCard;
