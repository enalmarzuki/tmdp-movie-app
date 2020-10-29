import React from "react";
import NoImage from "../../../assets/img/thumb/no-image.png";
import { BackdropPathW342 } from "../../../services/Config";

import "./Card.scss";

export default function Card(props) {
  const thumb =
    props.thumb === null ? NoImage : `${BackdropPathW342}${props.thumb}`;

  // console.log(props);
  const detail = () => {
    if (props.movie) {
      return props.history.push(`/detail-movie/${props.id}`);
    }

    return props.history.push(`/detail-person/${props.id}`);
  };
  return (
    <div className="card bg-dark" onClick={detail}>
      <div className="card-img-wraper">
        <img
          className="card-img-top"
          src={thumb === null ? NoImage : thumb}
          alt="thumb"
        />
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
