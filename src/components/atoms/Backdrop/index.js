import React from "react";
import { Fade } from "react-awesome-reveal";
import { BackdropPath } from "../../../services/Config";

import "./Backdrop.scss";

export default function Backdrop(props) {
  const backdrop = `${BackdropPath}/${props.backdrop}`;
  return (
    <div className="backdrop">
      <Fade delay={300} triggerOnce>
        <img src={backdrop} alt="backdrop-ori" className="img-backdrop" />
      </Fade>
    </div>
  );
}
