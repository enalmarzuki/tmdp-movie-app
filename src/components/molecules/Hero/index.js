import React, { Component } from "react";
import ReactPlayer from "react-player/youtube";
import { Fade } from "react-awesome-reveal";
import { RootPath, APIKey } from "../../../services/Config";
import axios from "axios";

import Button from "../../../components/atoms/Button";
import "./Hero.scss";

export default class Hero extends Component {
  state = {
    key: "",
    play: true,
  };
  watchTrailer = (id) => {
    axios
      .get(`${RootPath}/movie/${id}/videos?api_key=${APIKey}`)
      .then((res) => {
        const key = res.data.results[0];
        this.setState({
          key: key.key,
          play: true,
        });
        const heroOverlay = document.querySelector("#hero-overlay");
        heroOverlay.classList.toggle("show");
      })
      .catch((err) => console.log(err));
  };

  detailMovie = (id) => {
    return this.props.history.push(`/detail-movie/${id}`);
  };

  closeOverlay = () => {
    const heroOverlay = document.querySelector("#hero-overlay");
    heroOverlay.classList.toggle("show");
    this.setState({
      play: false,
    });
  };

  render() {
    const src = `https://www.youtube.com/watch?v=${this.state.key}`;

    if (this.props.detailPage) {
    }

    return (
      <div className="container hero-container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <Fade delay={500}>
              {this.props.isLogin ? (
                <p className="title-hero mb-2">Trending this week</p>
              ) : (
                <p className="title-hero mb-2">
                  Movies that are trending lately
                </p>
              )}

              <h1 className="title-hero mb-3">
                {this.props.data.original_title}
              </h1>
              <p className="title-hero ">{this.props.data.overview}</p>
              <div className="btn-wrapper">
                <Button
                  className="btn btn-danger"
                  onClick={() => this.watchTrailer(this.props.data.id)}
                >
                  Watch Trailer
                </Button>

                {!this.props.isLogin ? (
                  <div></div>
                ) : (
                  <Button
                    className="btn btn-secondary"
                    onClick={() => this.detailMovie(this.props.data.id)}
                  >
                    Info Detail
                  </Button>
                )}
              </div>
            </Fade>
            <div className="hero-overlay" id="hero-overlay">
              <Button
                className="btn btn-dark rounded-circle mb-3 px-3 py-2"
                onClick={this.closeOverlay}
              >
                X
              </Button>

              <ReactPlayer
                url={src}
                playing={this.state.play}
                controls={true}
                className="media-player"
              />
              <div className="embed-responsive embed-responsive-1by1 yt-comp"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
