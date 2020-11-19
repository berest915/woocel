import { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import {
  WRITE_USER_INFO,
  SET_LOGIN_STATUS,
  SET_ACCESS_TOKEN,
  RESET_AUTH,
} from "../types";

const AuthState = props => {
  const initialState = {
    user: {
      accessToken: null,
      displayName: null,
      email: null,
      photoURL: null,
    },
    rooms: [],
    isLogin: false,
    accessToken: null,
    hasNewlyAdded: false,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const writeUserInfo = user => {
    dispatch({
      type: WRITE_USER_INFO,
      payload: user,
    });
    dispatch({
      type: SET_LOGIN_STATUS,
    });
  };

  const setAccessToken = accessToken => {
    dispatch({
      type: SET_ACCESS_TOKEN,
      payload: accessToken,
    });
  };

  const resetAuth = () => {
    dispatch({ type: RESET_AUTH });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        rooms: state.rooms,
        isLogin: state.isLogin,
        accessToken: state.accessToken,

        writeUserInfo,
        setAccessToken,
        resetAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
