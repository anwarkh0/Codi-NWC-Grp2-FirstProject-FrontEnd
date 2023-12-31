import React from "react";
import serviceCardModule from "./serviceCard.module.css";

function ServiceCard({icon , text}) {
  return (
    <div className={serviceCardModule.card}>
      {
        text === 'VIP treatment'? (
          <img className="serviceIcon" src={icon} alt="service icon"/>
        ) : (
          icon
        )
      }
      <p className="iconDesc">{text}</p>
    </div>
  );
}

export default ServiceCard;
