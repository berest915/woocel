import { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import {
  WRITE_USER_INFO,
  SET_LOGIN_STATUS,
  SET_ACCESS_TOKEN,
  RESET_AUTH,
  SET_ROOMS,
  FILTER_CHATROOM,
  CLEAR_CHATROOM_FILTER,
  UPD_SEARCH_TEXT_REF,
} from "../types";

const AuthState = props => {
  const initialState = {
    user: {
      accessToken: null,
      displayName: null,
      email: null,
      photoURL: null,
    },
    rooms: null, // identify appended-format from db
    isLogin: false,
    accessToken: null,
    filteredChatroom: null,
    searchTextRef: null,
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

  const setRooms = (rooms) => {
    dispatch({
      type: SET_ROOMS,
      payload: rooms,
    })
  }

  const filterChatroom = (onSearchText) => {
    dispatch({
      type: FILTER_CHATROOM,
      payload: onSearchText,
    })
  }

  const clearChatroomFilter = () => {
    dispatch({
      type: CLEAR_CHATROOM_FILTER,
    })
  }

  const updSearchTextRef = (ref) => {
    dispatch({
      type: UPD_SEARCH_TEXT_REF,
      payload: ref
    })
  }  

 

  return (
    <AuthContext.Provider
      value={{
        isLogin: state.isLogin,
        accessToken: state.accessToken,
        user: state.user,
        rooms: state.rooms,
        filteredChatroom: state.filteredChatroom,
        searchTextRef: state.searchTextRef,
        updSearchTextRef,
        writeUserInfo,
        setAccessToken,
        resetAuth,
        setRooms,
        filterChatroom,
        clearChatroomFilter,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
