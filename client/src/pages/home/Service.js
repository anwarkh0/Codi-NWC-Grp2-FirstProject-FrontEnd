import React from "react";
import ServiceCard from "../../components/servicesCard/ServiceCard";
import book from "../../assets/book.png";
import call from "../../assets/call.png";
import contact from "../../assets/contact.png";
import map from "../../assets/map.png";
import personDollar from "../../assets/persondollar.png";
import vip from "../../assets/vip.png";
import serviceModule from "./services.module.css";
function Service() {
  let serviceArr = [
    {
      icon: book,
      text: "Fast booking",
    },
    {
      icon: call,
      text: "24/7 Service",
    },
    {
      icon: contact,
      text: "Personal recommendations",
    },
    {
      icon: map,
      text: "Traveler's Guide",
    },
    {
      icon: personDollar,
      text: "Points system",
    },
    {
      icon: vip,
      text: "VIP treatment",
    },
  ];
  return (
    <div>
      <h1 className={serviceModule.servicesHeader}>
        We do our best to provide you with the best services
      </h1>
      <section className={serviceModule.serviceList}>
        {serviceArr.map((card, index) => {
          return <ServiceCard key={index} icon={card.icon} text={card.text} />;
        })}
      </section>
    </div>
  );
}

export default Service;
