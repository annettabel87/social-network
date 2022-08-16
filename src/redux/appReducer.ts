import { ThunkDispatch } from 'redux-thunk';
import { IActionType, IAppState } from '../interfaces';
import { getAuthInfo } from './authReducer';

const SET_INITIALIZED = 'SET_INITIALIZED';

export const initializedCreator = () => ({
  type: SET_INITIALIZED,
});

const initialState = {
  initialized: false,
};
const appReducer = (state: IAppState = initialState, action: IActionType) => {
  switch (action.type) {
    case SET_INITIALIZED: {
      return {
        ...state,
        initialized: true,
      };
    }

    default:
      return state;
  }
};
export const initializedSuccess = () => {
  return (dispatch: ThunkDispatch<IAppState, unknown, IActionType>) => {
    const promise = dispatch(getAuthInfo());
    Promise.all([promise])
      .then(() => {
        dispatch(initializedCreator());
      })
      .catch((error) => {
        console.warn(error);
      });
  };
};

export default appReducer;
