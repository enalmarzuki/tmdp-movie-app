import React, { Component } from "react";

import { connect } from "react-redux";
import { getMovieTrandingDay } from "../../../config/Redux/action";
import { BackdropPath } from "../../../services/Config";

import { RootPath, APIKey } from "../../../services/Config";

// Component
// import Header from "../../../components/molecules/Header";
import axios from "axios";
import ReactPlayer from "react-player/lazy";

// Style
import "./UserHome.scss";

class UserHome extends Component {
  state = {
    data: "",
    search: "",
    key: "",
    play: true,
  };

  handleSearchOnChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
    console.log(this.state);
  };

  movieSearch = () => {
    const key = this.state.search;
    console.log(key);
    axios
      .get(
        `${RootPath}/search/movie?api_key=${APIKey}&language=en-US&query=${key}&page=1&include_adult=false`
      )
      .then((res) => {
        console.log(res);
      });
  };

  getMovieDay = async () => {
    const time = "week";
    const result = await this.props.movieTrandingDay(time);
    this.setState({
      data: result,
    });

    const backdrop = this.state.data.backdrop_path;
    const trailerId = this.state.data.id;
    await this.getBackdrop(backdrop);
    await this.watchTrailer(trailerId);
  };

  getBackdrop = (backdrop) => {
    const linkBackdrop = `${BackdropPath}/${backdrop}`;
    this.setState({
      backdrop: linkBackdrop,
    });
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
        // const heroOverlay = document.querySelector("#hero-overlay");
        // heroOverlay.classList.toggle("show");
      })
      .catch((err) => console.log(err));
  };

  handleClickMedia = () => {
    this.state.play
      ? this.setState({
          play: false,
        })
      : this.setState({
          play: true,
        });
  };

  componentDidMount() {
    this.getMovieDay();
  }

  render() {
    // const { isLogin, sessionId } = this.props;
    const { play } = this.state;
    console.log("state => ", this.state);
    const src = `https://www.youtube.com/watch?v=${this.state.key}`;
    console.log("SRC => ", src);
    // if (!isLogin && sessionId === "") {
    //   return <Redirect to="/" />;
    // }
    return (
      <div className="user-home">
        <ReactPlayer
          url={src}
          playing={play}
          volume={0}
          // controls={true}
          className="media-player-user-home"
          // width="100%"
          // height="100%"
        />
        {/* <Header {...this.props} isLogin={isLogin}></Header>

        <input
          id="search"
          type="text"
          className="form-control"
          placeholder="Search movie title"
          onChange={this.handleSearchOnChange}
        />

        <button className="btn btn-primary" onClick={this.movieSearch}>
          Search
        </button> */}

        <button className="btn btn-primary" onClick={this.handleClickMedia}>
          Search
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    sessionId: state.sessionId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    movieTrandingDay: (time) => dispatch(getMovieTrandingDay(time)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
