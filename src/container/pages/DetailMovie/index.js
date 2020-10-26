import React, { useEffect, useState } from "react";
import axios from "axios";
import { APIKey, BackdropPathW342, RootPath } from "../../../services/Config";
import { languageList } from "../../../services/Language";
import Loading from "../../../components/atoms/Loading";
import Header from "../../../components/molecules/Header";
import Backdrop from "../../../components/atoms/Backdrop";

import "./DetailMovie.scss";
import TitleSection from "../../../components/atoms/TitleSection";
import Card from "../../../components/atoms/Card";

export default function DetailMovie(props) {
  // console.log("Props => ", props.match.params.id);
  const id = props.match.params.id;
  const [data, setData] = useState("");
  const [credits, setCredits] = useState([]);

  const getMovieDetail = async (id) => {
    await axios
      .get(
        `${RootPath}/movie/${id}?api_key=${APIKey}&append_to_response=credits`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getCredits = async (id) => {
    await axios
      .get(`${RootPath}/movie/${id}/credits?api_key=${APIKey}`)
      .then((res) => {
        setCredits(res.data.cast);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMovieDetail(id);
    getCredits(id);
    return () => {
      console.log("Unmount");
    };
  }, [id]);

  // console.log(data);
  // console.log(credits);

  const posterPath = `${BackdropPathW342}/${data.poster_path}`;

  // Cari Durasi
  const a = 60;
  let Runtime = data.runtime;

  let hours = Math.floor(Runtime / a);
  let result = a * hours;
  let minute = Runtime - result;
  let Duration = `${hours > 0 ? `${hours} hrs` : ""} ${
    minute < 10 ? `0${minute}` : minute
  } mins`;

  // Cek Bahasa
  const language = languageList.filter(
    (lang) => lang.code === data.original_language
  );

  if (data === "") {
    return <Loading />;
  }

  return (
    <div className="detail-page">
      <Header {...props} isLogin={true}></Header>
      <Backdrop backdrop={data.backdrop_path} />

      <div className="container detail-hero">
        <div className="row align-items-center detail-row mt-5 ">
          <div className="col">
            <h1 className="detail-title">{data.original_title}</h1>
            <p className="detail-desc">{data.overview}</p>
            {data.genres.map((genre, i) => {
              return (
                <span
                  className="detail-movie-genre badge badge-pill badge-dark mt-2 mr-2 py-2 px-3"
                  key={i}
                >
                  {genre.name}
                </span>
              );
            })}
          </div>
          <div className="col p-0">
            <div className="poster-wrapper">
              <img
                src={posterPath}
                alt="poster"
                className="poster-detail-page"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container detail-actor">
        <TitleSection title="Actors" />

        <div className="row">
          {credits.map((actress, i) => {
            if (i < 6) {
              return (
                <div className="col-md-4 mb-4" key={i}>
                  <Card
                    title={actress.name}
                    thumb={actress.profile_path}
                    as={actress.character}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <div className="container detail-info-movie">
        <TitleSection title="Movie Info" />

        <div className="row title-movie-info w-100">
          <div className="col content-movie-info justify-content-center">
            <table className="table">
              <tbody>
                <tr>
                  <td className="movie-info">Title</td>
                  <td>{data.original_title}</td>
                </tr>
                <tr>
                  <td className="movie-info">Runtime</td>
                  <td>{Duration}</td>
                </tr>
                <tr>
                  <td className="movie-info">Language</td>
                  <td>{language[0].name}</td>
                </tr>
                <tr>
                  <td className="movie-info">Production</td>
                  <td>
                    {data.production_companies.map((production, i) => {
                      return (
                        <ul key={i} style={{ listStyle: "none", padding: "0" }}>
                          <li>{production.name}</li>
                        </ul>
                      );
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="movie-info">Status</td>
                  <td>{data.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
