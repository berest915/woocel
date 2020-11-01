import { useReducer } from "react";
//! Context
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import {
  SET_USER,
  SET_LOGIN_STATUS,
  SET_ACCESS_TOKEN,
  RESET_AUTH,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    user: null,
    isLogin: false,
    accessToken: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setUser = (result) => {
    console.log(result);
    dispatch({
      type: SET_USER,
      payload: result.user,
    });
    dispatch({
      type: SET_LOGIN_STATUS,
    });
  };

  const setAccessToken = (accessToken) => {
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
        isLogin: state.isLogin,
        accessToken: state.accessToken,
        setUser,
        setAccessToken,
        resetAuth
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
