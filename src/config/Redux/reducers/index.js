import { GET_MOVIE_TRANDING_DAY, SET_SESSION_ID, LOGIN } from "../type";

const initialState = {
  data: "",
  isLogin: true,
  sessionId: "",
  isLoading: true,
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

    default:
      return state;
  }
};

export default reducer;
