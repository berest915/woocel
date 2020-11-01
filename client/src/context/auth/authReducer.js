import { SET_LOGIN_STATUS, SET_USER, SET_ACCESS_TOKEN, RESET_AUTH } from "../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
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
    case RESET_AUTH:
        return{
            ...state,
            user: null,
            isLogin: false,
            accessToken: null,
        }
    default:
      throw Error(`Auth Reducer - Unhandled Action: ${action.type}`);
  }
};
export default authReducer;
