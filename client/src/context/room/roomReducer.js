import {
  SET_ROOMS,
  FILTER_CHATROOM,
  CLEAR_CHATROOM_FILTER,
  WRITE_CONTEXT_SEARCH_REF,
} from "../types";

const roomReducer = (state, action) => {
  switch (action.type) {
    case SET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    case FILTER_CHATROOM:
      return {
        ...state,
        filteredChatroom:
          state.rooms &&
          state.rooms.filter(room => {
            const replaceText = action.payload.replace(/[^a-zA-Z0-9_-]/g, "");
            const regex = new RegExp(`${replaceText}`, "gi");
            return room.data.name.match(regex);
          }),
      };
    case CLEAR_CHATROOM_FILTER:
      return {
        ...state,
        filteredChatroom: null,
      };
    case WRITE_CONTEXT_SEARCH_REF:
      return{
        ...state,
        searchRef: action.payload,
      }
    default:
      throw Error(`Room Reducer - Unhandled Action: ${action.type}`);
  }
};
export default roomReducer;
