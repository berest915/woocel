import { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import {
  WRITE_USER_INFO,
  SET_LOGIN_STATUS,
  SET_ACCESS_TOKEN,
  SET_ROOM_AVATAR_URL,
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
    rooms: [], // identify appended-format from db
    isLogin: false,
    accessToken: null,
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

  const setRoomAvatarUrl = (url, roomId) => {

    let payloadRef = {
      url,
      roomId
    }
    // shud upd / shud append
    dispatch({
      type: SET_ROOM_AVATAR_URL,
      payload: payloadRef
    })
    
  }


  const resetAuth = () => {
    dispatch({ type: RESET_AUTH });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        updrooms: state.rooms,
        isLogin: state.isLogin,
        accessToken: state.accessToken,
        testRooms: state.testRooms,
        updState: state.updState,
        writeUserInfo,
        setAccessToken,
        setRoomAvatarUrl,
        resetAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
