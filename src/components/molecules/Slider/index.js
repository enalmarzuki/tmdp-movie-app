import React from "react";
import Button from "../../atoms/Button";
import "./Slider.scss";

export default function Slider(props) {
  const nextSlider = (e) => {
    const sliderContainer = document.querySelector(`#${props.slideHire}`);
    // console.log(sliderContainer.id);
    sliderContainer.scrollLeft += 557;

    // console.log(e.target);
  };

  const prevSlider = (e) => {
    const sliderContainer = document.querySelector(`#${props.slideHire}`);
    sliderContainer.scrollLeft -= 557;
  };
  return (
    <div className="slider-container">
      <h3 className="text-white">{props.title}</h3>

      <div className="slider-content" id={props.slideHire}>
        <Button className="btn-prev" id={props.slideHire} onClick={prevSlider}>
          Prev
        </Button>
        <Button className="btn-next" onClick={nextSlider}>
          Next
        </Button>
        {props.children}
      </div>
    </div>
  );
}
