import {
  GET_MOVIE_TRANDING_DAY,
  SET_SESSION_ID,
  LOGIN,
  SEARCH_MOVIE,
} from "../type";

const initialState = {
  data: "",
  isLogin: true,
  sessionId: "",
  isLoading: true,
  resultMovies: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_TRANDING_DAY:
      return {
        ...state,
        data: action.value,
      };

    case SET_SESSION_ID:
      return {
        ...state,
        sessionId: action.value,
      };

    case LOGIN:
      return {
        ...state,
        isLogin: action.value,
      };

    case SEARCH_MOVIE:
      return {
        ...state,
        resultMovies: action.value,
      };

    default:
      return state;
  }
};

export default reducer;
