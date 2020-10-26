import React from "react";
import { Fade } from "react-awesome-reveal";
import loading from "../../../assets/img/logo/loading.gif";

export default function Loading() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <Fade delay={100}>
            <img
              src={loading}
              alt="Loading..."
              style={{ height: "100vh", width: "100%" }}
            />
          </Fade>
        </div>
      </div>
    </div>
  );
}
