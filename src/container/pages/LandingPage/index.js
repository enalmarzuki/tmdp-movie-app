import React, { Component } from "react";
import { RootPath, APIKey, BackdropPath } from "../../../services/Config";
import axios from "axios";

import Loading from "../../../assets/img/logo/loading.gif";
import Cinema from "../../../assets/img/logo/cinema.svg";

import "./LandingPage.scss";
import Header from "../../../components/molecules/Header";
import Button from "../../../components/atoms/Button";
// import Fade from "react-reveal/Fade";
import { Fade } from "react-awesome-reveal";
import Hero from "../../../components/molecules/Hero";

export default class LandingPage extends Component {
  state = {
    isLoading: true,
    data: "",
    backdrop: "",
    isLogin: false,
    key: "",
    play: true,
  };

  getBackdrop = (backdrop) => {
    const linkBackdrop = `${BackdropPath}/${backdrop}`;
    this.setState({
      backdrop: linkBackdrop,
    });
  };

  componentDidMount() {
    setTimeout(() => {
      axios
        .get(`${RootPath}/trending/movie/day?api_key=${APIKey}`)
        .then((res) => {
          this.setState({
            data: res.data.results[0],
          });
          this.getBackdrop(this.state.data.backdrop_path);
        })
        .catch((err) => console.log(err));
    }, 0);
  }

  render() {
    const { data, backdrop, isLogin, key } = this.state;
    // const src = `https://www.youtube.com/watch?v=${key}`;
    if (data === "") {
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <Fade delay={300}>
                <img
                  src={Loading}
                  alt="Loading..."
                  style={{ height: "100vh", width: "100%" }}
                />
              </Fade>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="landingPage">
        <Fade delay={300} triggerOnce>
          <div className="backdrop">
            <img src={backdrop} alt="backdrop-ori" className="img-backdrop" />
          </div>
        </Fade>
        <Header {...this.props} isLogin={isLogin}></Header>

        <div className="hero">
          {/* hero */}
          <Hero data={data} key={key} />

          <div className="container moviedb-container pb-5">
            <div className="row text-white">
              <div className="col-md-12 d-flex justify-content-center mt-5 ">
                <h1>MovieDB </h1>
              </div>
            </div>

            <div className="row text-white">
              <div className="moviedb-wrapper">
                <div className="col-md-6 moviedb-desc align-self-center">
                  <Fade delay={500}>
                    <h3 className="mb-3">
                      Join our community, and find your favorite movies
                    </h3>
                    <Button className="btn px-4" isDanger>
                      Click Me
                    </Button>
                  </Fade>
                </div>

                <div className="col-md-6 moviedb-img">
                  <Fade delay={500}>
                    <img
                      src={Cinema}
                      className="cimena-img w-100"
                      alt="Cinema"
                    />
                  </Fade>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
