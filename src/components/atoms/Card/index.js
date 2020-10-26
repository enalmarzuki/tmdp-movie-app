import React from "react";
import { BackdropPathW342 } from "../../../services/Config";

import "./Card.scss";

export default function Card(props) {
  const thumb = `${BackdropPathW342}${props.thumb}`;
  return (
    <div className="card bg-dark">
      <div className="card-img-wraper">
        <img className="card-img-top" src={thumb} alt="thumb" />
      </div>

      <div className="card-body" id="title-movie">
        <h5 className="card-title mb-0">{props.title}</h5>
        {props.as ? (
          <div>
            <p className="font-italic mb-0">as</p>
            <h5 className="mb-0">{props.as}</h5>
          </div>
        ) : null}
      </div>
    </div>
  );
}
