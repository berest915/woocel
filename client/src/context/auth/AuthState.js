import { useReducer } from "react";
//! Context
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import {
  WRITE_USER_INFO,
  SET_LOGIN_STATUS,
  SET_ACCESS_TOKEN,
  SET_NEW_ROOM,
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
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const writeUserInfo = result => {
    dispatch({
      type: WRITE_USER_INFO,
      payload: result.user,
    });
    dispatch({
      type: SET_LOGIN_STATUS,
    });
  };

  const rewriteUserInfo = user => {
    dispatch({
      type: WRITE_USER_INFO,
      payload: user,
    });
  };

  const setAccessToken = accessToken => {
    dispatch({
      type: SET_ACCESS_TOKEN,
      payload: accessToken,
    });
  };
  
  const setNewRoom = (roomName) => {
    dispatch({
      type: SET_NEW_ROOM,
      payload: roomName,
    })
  }

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
        rewriteUserInfo,
        setNewRoom,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
