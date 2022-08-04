import { Dispatch } from 'redux';
import { profileAPI } from '../API/Api';
import { IActionType, IAuthState, IUserData } from '../interfaces';

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

export const setUserData = (data: IUserData | null) => ({
  type: SET_USER_DATA,
  data: data,
});

export const toggleIsFetching = (isFetching: boolean) => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching,
  };
};

const initialState = {
  id: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
};
const authReducer = (state: IAuthState = initialState, action: IActionType) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        id: action.data?.id,
        email: action.data?.email,
        login: action.data?.login,
        isAuth: true,
      };
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    default:
      return state;
  }
};
export const getAuthInfo = () => {
  return (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true));
    profileAPI.getAuthUserInfo().then((response) => {
      if (response.resultCode === 0) {
        dispatch(setUserData(response.data));
      }
      dispatch(toggleIsFetching(false));
    });
  };
};
export default authReducer;
