import React from "react";
import testimonialsModule from "../styles/testimonials.module.css";
import alex from "../assets/alex.png";
import quotation from "../assets/quotation.png";
import quotation1 from "../assets/quotation-1.png";

function Testimonials() {
  return (
    <div className={testimonialsModule.testimonials}>
      <div className={testimonialsModule.left}>
        <p className={testimonialsModule.text}>
          <span className={testimonialsModule.quotations}>
            <img src={quotation1} />
          </span>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy Lorem
          Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy Lorem
          Ipsum is simply dummy text of the printing and typesetting industry.
          <span className={testimonialsModule.quotations}>
            <img src={quotation} />
          </span>
        </p>
        <div className={testimonialsModule.info}>
          <p className={testimonialsModule.name}>
            Alexandr Ivchenko
            <p className={testimonialsModule.job}>Businessman</p>
          </p>
        </div>
      </div>
      <img src={alex} alt="review picture" className={testimonialsModule.img} />
    </div>
  );
}

export default Testimonials;
