import { useReducer } from "react";
import RoomContext from "./roomContext";
import RoomReducer from "./roomReducer";
import {
  SET_ROOMS,
  FILTER_CHATROOM,
  CLEAR_CHATROOM_FILTER,
  WRITE_CONTEXT_SEARCH_REF,
} from "../types";

const RoomState = props => {
  const initialState = {
    rooms: null, // identify appended-format from db
    filteredChatroom: null,
    searchRef: null,
  };
  const [state, dispatch] = useReducer(RoomReducer, initialState);

  const setRooms = rooms => {
    dispatch({
      type: SET_ROOMS,
      payload: rooms,
    });
  };

  const filterChatroom = onSearchText => {
    dispatch({
      type: FILTER_CHATROOM,
      payload: onSearchText,
    });
  };

  const clearChatroomFilter = () => {
    dispatch({
      type: CLEAR_CHATROOM_FILTER,
    });
  };

  const writeContext_searchRef = searchRef => {
    dispatch({
      type: WRITE_CONTEXT_SEARCH_REF,
      payload: searchRef,
    });
  };

  return (
    <RoomContext.Provider
      value={{
        rooms: state.rooms,
        filteredChatroom: state.filteredChatroom,
        searchRef: state.searchRef,
        writeContext_searchRef,
        setRooms,
        filterChatroom,
        clearChatroomFilter,
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
};
export default RoomState;
