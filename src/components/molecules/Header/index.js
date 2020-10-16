import React from "react";
import Button from "../../../components/atoms/Button";
import Fade from "react-reveal/Fade";

import "./Header.scss";

export default function Header(props) {
  const getNavLinkClass = (path) => {
    return props.location.pathname === path ? " active" : "";
  };

  if (!props.isLogin) {
    return (
      <header className="spacing-sm">
        <Fade delay={500}>
          <nav className="navbar justify-content-between pt-4">
            <div className="container px-0">
              <h2>MovieDB</h2>
              <Button
                className="btn btn-outline-danger my-2 my-sm-0"
                type="link"
                href="/login"
              >
                Login
              </Button>
            </div>
          </nav>
        </Fade>
      </header>
    );
  }

  return (
    <header className="spacing-sm">
      <nav className="navbar navbar-expand-lg navbar-right pt-4 px-0">
        <div className="container">
          <h2 className="mb-0">MovieDB</h2>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-5">
              <li className={`nav-item${getNavLinkClass("/")}`}>
                <Button className="nav-link" type="link" href="/">
                  Home
                </Button>
              </li>
              <li className={`nav-item${getNavLinkClass("/browse-by")}`}>
                <Button className="nav-link" type="link" href="/browse-by">
                  Browse By
                </Button>
              </li>
              <li className={`nav-item${getNavLinkClass("/stories")}`}>
                <Button className="nav-link" type="link" href="/stories">
                  Stories
                </Button>
              </li>
              <li className={`nav-item${getNavLinkClass("/agents")}`}>
                <Button className="nav-link" type="link" href="/agents">
                  Agents
                </Button>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className={`nav-item${getNavLinkClass("/search")}`}>
                <Button className="nav-link" type="link" href="/">
                  Search
                </Button>
              </li>
              <li className={`nav-item${getNavLinkClass("/notif")}`}>
                <Button className="nav-link" type="link" href="/browse-by">
                  Notification
                </Button>
              </li>

              <li className={`nav-item${getNavLinkClass("/account")}`}>
                <Button className="nav-link" type="link" href="/account">
                  Account
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
