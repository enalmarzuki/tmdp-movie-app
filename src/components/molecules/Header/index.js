import React, { useState } from "react";
import Button from "../../../components/atoms/Button";
import { Fade } from "react-awesome-reveal";

import Search from "../../../assets/img/icon/search.svg";
import User from "../../../assets/img/icon/user.svg";

import "./Header.scss";

export default function Header(props) {
  const [keyword, setKeyword] = useState("");

  const getNavLinkClass = (path) => {
    return props.location.pathname === path ? " active" : "";
  };

  const searchClick = (e) => {
    const btnSearch = e.target;
    btnSearch.classList.toggle("show");
    const inputSearch = document.querySelector(".input-search");
    inputSearch.classList.toggle("show");
  };

  const handleOnChange = async (e) => {
    const keywordSearch = e.target.value;
    setKeyword(keywordSearch);
  };

  const searchMovies = async (e) => {
    if (e.key === "Enter") {
      props.history.push(`/movies-search/seacrh=${keyword}`);
    }
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
            </ul>

            <div className="search-wrapper ml-auto">
              <img
                src={Search}
                alt="ic-search"
                className="icon-search"
                onClick={searchClick}
              />

              <input
                type="text"
                className="form-control input-search mr-2"
                placeholder="Search"
                onChange={handleOnChange}
                onKeyDown={searchMovies}
              />

              <img src={User} alt="ic-search" className="icon-user" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
