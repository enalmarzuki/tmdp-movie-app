import axios from "axios";
import { GET_MOVIE_TRANDING_DAY, SET_SESSION_ID, LOGIN } from "../type";
import { RootPath, APIKey } from "../../../services/Config";

export const getMovieTrandingDay = (time) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${RootPath}/trending/movie/${time}?api_key=${APIKey}`)
      .then((res) => {
        resolve(res.data.results[0]);
        dispatch({
          type: GET_MOVIE_TRANDING_DAY,
          value: res.data.results[0],
        });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const userLogin = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${RootPath}/authentication/token/new?api_key=${APIKey}`)
      .then((res) => {
        const request_token = res.data.request_token;
        data.request_token = request_token;

        axios({
          method: "POST",
          url: `${RootPath}/authentication/token/validate_with_login?api_key=${APIKey}`,
          data: data,
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => {
            const request_token = {
              request_token: res.data.request_token,
            };
            axios({
              method: "POST",
              url: `${RootPath}/authentication/session/new?api_key=${APIKey}`,
              data: request_token,
              headers: { "Content-Type": "application/json" },
            })
              .then((res) => {
                if (res.data.success) {
                  dispatch({ type: LOGIN, value: true });
                  dispatch({
                    type: SET_SESSION_ID,
                    value: res.data.session_id,
                  });
                }
                resolve(res);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
            dispatch({ type: LOGIN, value: false });
          });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
        dispatch({ type: LOGIN, value: false });
      });
  });
};

export const getPupolarMovie = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${RootPath}/movie/popular?api_key=${APIKey}&language=en-US&page=1`)
      .then((res) => {
        resolve(res.data.results);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const getTopRatedMovie = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${RootPath}/movie/top_rated?api_key=${APIKey}&language=en-US&page=1`
      )
      .then((res) => {
        resolve(res.data.results);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const getUpcomingMovie = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${RootPath}/movie/upcoming?api_key=${APIKey}&language=en-US&page=1`)
      .then((res) => {
        resolve(res.data.results);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
