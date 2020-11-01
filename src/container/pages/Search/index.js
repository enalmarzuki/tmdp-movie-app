import React, { Component } from "react";
import { connect } from "react-redux";
import { getSearchMovies } from "../../../config/Redux/action";

import Card from "../../../components/atoms/Card";
import Pagination from "../../../components/molecules/Pagination";

import Loading from "../../../components/atoms/Loading";

class Search extends Component {
  state = {
    data: "",
    page: 1,
  };

  getMovie = async (keyword, page) => {
    const result = await this.props.searchMovie(keyword, page);
    this.setState({
      data: result,
    });
  };

  componentDidMount() {
    this.getMovie(this.props.match.params.query, this.state.page);
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
    // console.log("update");
  }

  render() {
    const { match } = this.props;
    const { data, page } = this.state;

    if (data === "") {
      return <Loading />;
    }

    return (
      <div className="container text-white">
        <div className="row ">
          <div className="col justify-content-center my-5">
            <h2>Search Results "{match.params.query}"</h2>
          </div>
        </div>

        <div className="row">
          {data.results.map((movie, i) => {
            return (
              <div className="col-md-4 mb-3" key={i}>
                <Card
                  title={movie.original_title}
                  thumb={movie.poster_path}
                  id={movie.id}
                  {...this.props}
                  movie
                />
              </div>
            );
          })}
        </div>

        <div className="row mt-5">
          <div className="col">
            <Pagination
              data={data}
              page={page}
              query={match.params.query}
              searchMovie={this.getMovie}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    resSearchMovie: state.resultMovies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchMovie: (keyword, page) => dispatch(getSearchMovies(keyword, page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
