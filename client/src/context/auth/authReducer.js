import {
  SET_LOGIN_STATUS,
  SET_ACCESS_TOKEN,
  RESET_AUTH,
  WRITE_USER_INFO,
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
          // displayName: action.payload.displayName,
          displayName: !action.payload.updatedDisplayName
            ? action.payload.displayName
            : action.payload.updatedDisplayName,

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
    default:
      throw Error(`Auth Reducer - Unhandled Action: ${action.type}`);
  }
};
export default authReducer;
