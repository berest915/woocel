import {
  SET_LOGIN_STATUS,
  SET_ACCESS_TOKEN,
  RESET_AUTH,
  WRITE_USER_INFO,
  SET_ROOMS,
  FILTER_CHATROOM,
  CLEAR_CHATROOM_FILTER,
  WRITE_CONTEXT_SEARCH_REF,
} from "../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return {
        ...state,
        isLogin: true,
      };
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case WRITE_USER_INFO:
      return {
        ...state,
        user: {
          accessToken: action.payload.accessToken,
          displayName: action.payload.displayName,
          email: action.payload.email,
          photoURL: action.payload.photoURL,
        },
      };
    case RESET_AUTH:
      return {
        ...state,
        user: null,
        isLogin: false,
        accessToken: null,
      };
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
      throw Error(`Auth Reducer - Unhandled Action: ${action.type}`);
  }
};
export default authReducer;
