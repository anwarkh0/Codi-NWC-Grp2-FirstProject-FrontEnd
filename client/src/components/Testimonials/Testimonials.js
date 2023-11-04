import React from "react";
import testimonialsModule from "./testimonials.module.css";
import alex from "../../assets/images/alex.png";
import quotation from "../../assets/images/quotation.png";
import quotation1 from "../../assets/images/quotation-1.png";

function Testimonials() {
  return (
    <div className={testimonialsModule.testimonials}>
      <div className={testimonialsModule.left}>
        <p className={testimonialsModule.text}>
          <span className={testimonialsModule.quotations}>
            <img src={quotation1} alt='quotation mark'/>
          </span>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy Lorem
          Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy Lorem
          Ipsum is simply dummy text of the printing and typesetting industry.
          <span className={testimonialsModule.quotations}>
            <img src={quotation} alt='quotation mark'/>
          </span>
        </p>
        <div className={testimonialsModule.info}>
          <p className={testimonialsModule.name}>
            Alexandr Ivchenko
            <p className={testimonialsModule.job}>Businessman</p>
          </p>
        </div>
      </div>
      <img src={alex} alt="review" className={testimonialsModule.img} />
    </div>
  );
}

export default Testimonials;
