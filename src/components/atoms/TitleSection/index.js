import React from "react";
import "./TitleSection.scss";

export default function TitleSection(props) {
  return (
    <div className="row text-white">
      <div className="col-md-12 my-5 section-title ">
        <h1>{props.title}</h1>
      </div>
    </div>
  );
}
