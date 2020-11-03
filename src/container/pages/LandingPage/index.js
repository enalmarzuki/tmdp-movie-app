import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getMovieTrandingDay,
  getPupolarMovie,
  getTopRatedMovie,
  getUpcomingMovie,
} from "../../../config/Redux/action";

import { Fade } from "react-awesome-reveal";
import "./LandingPage.scss";

// Components
import Loading from "../../../components/atoms/Loading";
import Backdrop from "../../../components/atoms/Backdrop";
import Header from "../../../components/molecules/Header";
import Hero from "../../../components/molecules/Hero";
import Slider from "../../../components/molecules/Slider";
import Card from "../../../components/atoms/Card";
import TitleSection from "../../../components/atoms/TitleSection";

class LandingPage extends Component {
  state = {
    backdrop: "",
    play: true,
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
  };

  getMovieDay = async () => {
    let time = "";
    this.props.isLogin ? (time = "week") : (time = "day");

    await this.props.movieTrandingDay(time);
  };

  getPopularMovie = async () => {
    const popularMovie = await this.props.pupolarMovie();
    this.setState({
      popularMovies: popularMovie,
    });
  };

  topMovie = async () => {
    const topRatedMovie = await this.props.topRatedMovie();
    this.setState({
      topRatedMovies: topRatedMovie,
    });
  };

  upcoming = async () => {
    const upcomingMovie = await this.props.upcomingMovie();
    this.setState({
      upcomingMovies: upcomingMovie,
    });
  };

  // static getDerivedStateFromProps(props, state) {
  //   if (props.isLogin && props.sessionId !== "") {
  //     props.history.push("/home-user");
  //   }
  //   return null;
  // }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getMovieDay();
    this.getPopularMovie();
    this.topMovie();
    this.upcoming();
  }

  render() {
    const { key, popularMovies, topRatedMovies, upcomingMovies } = this.state;
    const { data, isLogin } = this.props;

    if (!this.props.data && this.state.popularMovies === "") {
      return <Loading />;
    }

    return (
      <div className="landingPage">
        <Backdrop backdrop={data.backdrop_path} />
        <Header {...this.props} isLogin={isLogin}></Header>

        <div className="hero">
          <Hero data={data} key={key} isLogin={isLogin} {...this.props} />

          <div className="container moviedb-container pb-5">
            <TitleSection title="MovieDB" />

            <div className="row">
              <div className="col">
                <Fade delay={500}>
                  <Slider title="Popular Movie" slideHire="popular">
                    {popularMovies.map((popularMovie, i) => {
                      return (
                        <Card
                          title={popularMovie.original_title}
                          thumb={popularMovie.backdrop_path}
                          id={popularMovie.id}
                          {...this.props}
                          key={i}
                          movie
                        />
                      );
                    })}
                  </Slider>
                </Fade>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col">
                <Fade delay={500}>
                  <Slider title="Top Rated" slideHire="top-rate">
                    {topRatedMovies.map((topRatedMovie, i) => {
                      return (
                        <Card
                          title={topRatedMovie.original_title}
                          thumb={topRatedMovie.backdrop_path}
                          id={topRatedMovie.id}
                          {...this.props}
                          key={i}
                          movie
                        />
                      );
                    })}
                  </Slider>
                </Fade>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col">
                <Fade delay={500}>
                  <Slider title="Upcoming" slideHire="upcoming">
                    {upcomingMovies.map((upcomingMovie, i) => {
                      return (
                        <Card
                          title={upcomingMovie.original_title}
                          thumb={upcomingMovie.backdrop_path}
                          id={upcomingMovie.id}
                          {...this.props}
                          key={i}
                          movie
                        />
                      );
                    })}
                  </Slider>
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    isLogin: state.isLogin,
    sessionId: state.sessionId,
    resSearchMovie: state.resultMovies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    movieTrandingDay: (time) => dispatch(getMovieTrandingDay(time)),
    pupolarMovie: () => dispatch(getPupolarMovie()),
    topRatedMovie: () => dispatch(getTopRatedMovie()),
    upcomingMovie: () => dispatch(getUpcomingMovie()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
