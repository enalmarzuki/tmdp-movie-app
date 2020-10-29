import React from "react";
import "./TitleSection.scss";

export default function TitleSection(props) {
  return (
    <div className="row text-white">
      <div className="col-md-12 mt-5 mb-4 section-title ">
        <h1>{props.title}</h1>
      </div>
    </div>
  );
}
