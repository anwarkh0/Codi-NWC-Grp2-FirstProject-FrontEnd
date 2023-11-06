import React from "react";
import style from "../Select/Select.module.css";

const Select = (props) => {
  const Increase = () => {
    props.setSelected((prev) => prev + 1);
  };

  const Decrease = () => {
    props.setSelected((prev) => {
      if (prev > 1) return prev - 1;
      else return prev;
    });
  };

  return (
    <section className={style.selection}>
      <p>{props.label}</p>
      <div className={style.container}>
        <div
          className={`${props.selected > 1 ? style.counterButton : style.blur}`}
          onClick={Decrease}
        >
          -
        </div>
        <p className={style.counterValue}>{props.selected}</p>
        <div className={style.counterButton} onClick={Increase}>
          +
        </div>
      </div>
    </section>
  );
};

export default Select;
