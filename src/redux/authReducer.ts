import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { profileAPI, securityAPI } from '../API/Api';
import { IActionType, IAuthState, IState } from '../interfaces';

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL';

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
export const getCaptchaUrlSuccess = (captchaUrl: string | null) => {
  return {
    type: GET_CAPTCHA_URL,
    captchaUrl: captchaUrl,
  };
};

const initialState = {
  id: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null,
};
const authReducer = (state: IAuthState = initialState, action: IActionType): IAuthState => {
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
        isFetching: action.isFetching ? action.isFetching : false,
      };
    }

    case GET_CAPTCHA_URL: {
      return {
        ...state,
        captchaUrl: action.captchaUrl ? action.captchaUrl : null,
      };
    }
    default:
      return state;
  }
};
export const getAuthInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true));
    const response = await profileAPI.getAuthUserInfo();
    if (response.resultCode === 0) {
      const { id, login, email } = response.data;
      dispatch(setUserData(id, email, login, true));
    }
    dispatch(toggleIsFetching(false));
  };
};
export const logIn = (
  email: string,
  password: string,
  rememberMe: boolean,

  setStatus: (status: string) => void,
  captcha: string | null
) => {
  return async (dispatch: ThunkDispatch<IState, unknown, IActionType>) => {
    const response = await profileAPI.login(email, password, rememberMe, setStatus, captcha);

    if (response.resultCode === 0) {
      dispatch(getAuthInfo());
    } else {
      if (response.resultCode === 10) {
        dispatch(getCaptchaUrl());
      } else {
        setStatus(response.messages[0]);
      }
    }
  };
};
export const logOut = () => {
  return async (dispatch: Dispatch) => {
    const response = await profileAPI.logout();
    if (response.resultCode === 0) {
      dispatch(setUserData(null, null, null, false));
    }
  };
};
export const getCaptchaUrl = () => {
  return async (dispatch: Dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
  };
};
export default authReducer;
