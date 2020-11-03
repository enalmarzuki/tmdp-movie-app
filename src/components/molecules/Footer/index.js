import React from "react";
import Button from "../../atoms/Button";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col mb-4">
            <h2>MovieDB</h2>
            <p className="brand-tagline">
              Millions of movies, TV shows and people to discover. Explore now.
            </p>
          </div>

          <div className="col-md-3 mb-4 ml-auto">
            <h6 className="mt-2 footer-title">Built Using</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">React JS</li>
              <li className="list-group-item">The Movie Database API</li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="mt-2 footer-title">Built By</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <Button
                  type="link"
                  href="https://id.linkedin.com/in/enal-marzuki-6a12a91a3"
                  isExternal
                  target="_blank"
                >
                  Marzuki . R
                </Button>
              </li>
              <li className="list-group-item">
                <Button type="link" isDisabled>
                  Makassar , Sulawesi Selatan
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 text-center copyrights">
            Copyright • 2020 All rights reserved • MovieDB
          </div>
        </div>
      </div>
    </footer>
  );
}
