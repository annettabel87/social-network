import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { profileAPI } from '../API/Api';
import { IActionType, IAuthState, IState } from '../interfaces';

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

export const setUserData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
) => ({
  type: SET_USER_DATA,
  data: { id, email, login, isAuth },
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
        ...action.data,
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
        const { id, login, email } = response.data;
        dispatch(setUserData(id, email, login, true));
      }
      dispatch(toggleIsFetching(false));
    });
  };
};
export const logIn = (email: string, password: string, rememberMe: boolean) => {
  return (dispatch: ThunkDispatch<IState, unknown, IActionType>) => {
    profileAPI.login(email, password, rememberMe).then((response) => {
      if (response.resultCode === 0) {
        dispatch(getAuthInfo());
      }
    });
  };
};
export const logOut = () => {
  return (dispatch: ThunkDispatch<IState, unknown, IActionType>) => {
    profileAPI.logout().then((response) => {
      if (response.resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
      }
    });
  };
};
export default authReducer;
