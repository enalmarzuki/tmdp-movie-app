import React, { Component } from "react";
import axios from "axios";
import { APIKey, BackdropPathW342, RootPath } from "../../../services/Config";
import Card from "../../../components/atoms/Card";
import Header from "../../../components/molecules/Header";
import Loading from "../../../components/atoms/Loading";

import "./DetailPerson.scss";
import TitleSection from "../../../components/atoms/TitleSection";

export default class DetailPerson extends Component {
  state = {
    data: "",
    birthday: "",
    personMovies: [],
  };

  getDetailPerson = async (id) => {
    await axios
      .get(`${RootPath}/person/${id}?api_key=${APIKey}`)
      .then((res) => {
        const birthday = res.data.birthday;
        this.setState({
          data: res.data,
          birthday: birthday,
        });
      })
      .catch((err) => console.log(err));
  };

  getPersonMovies = async (id) => {
    await axios
      .get(`${RootPath}/person/${id}/movie_credits?api_key=${APIKey}`)
      .then((res) => {
        this.setState({
          personMovies: res.data.cast,
        });
        // console.log(this.state.personMovies[0]);
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const idPerson = this.props.match.params.id;
    this.getDetailPerson(idPerson);
    this.getPersonMovies(idPerson);
  }
  render() {
    const { data, birthday, personMovies } = this.state;
    const profilePath = `${BackdropPathW342}/${data.profile_path}`;

    // console.log(personMovies);

    // cari umur
    const splitBirthday = birthday.split("-");
    const year = new Date().getFullYear();
    const fixBirthday = year - splitBirthday[0];

    // console.log(data);

    if (data === "") {
      return <Loading />;
    }

    return (
      <div className="detail-person">
        <Header {...this.props} isLogin={true} />

        <div className="container text-white ">
          <div className="row person-container align-items-center pt-5">
            <div className="col-md-4">
              <img
                src={profilePath}
                alt="img-profile"
                className="img-fluid poster-detail-person"
              />
            </div>
            <div className="col-md-7 offset-md-1 ">
              <h1>{data.name}</h1>
              <h5 className="mb-4">{data.known_for_department}</h5>
              <table className="table">
                <tbody>
                  <tr>
                    <td
                      style={{
                        borderTop: "0px",
                        padding: "0px",
                        color: "#A8A8A8",
                      }}
                    >
                      <h5>Age</h5>
                      <h5>Birthday</h5>
                      <h5>From</h5>
                    </td>
                    <td
                      className="text-white"
                      style={{ borderTop: "0px", padding: "0px" }}
                    >
                      <h5>{fixBirthday}</h5>
                      <h5>{data.birthday}</h5>
                      <h5>{data.place_of_birth}</h5>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="biography-wrapper">
            <TitleSection title="Biography" />
            <p className="biography-person">{data.biography}</p>
          </div>
        </div>

        <div className="container">
          <div className="biography-wrapper">
            <TitleSection title="Movies" />

            <div className="row">
              {personMovies.map((movie, i) => {
                return (
                  <div className="col-sm-6 col-md-4 mb-4" key={i}>
                    <Card
                      {...this.props}
                      title={movie.original_title}
                      thumb={movie.poster_path}
                      id={movie.id}
                      movie
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
