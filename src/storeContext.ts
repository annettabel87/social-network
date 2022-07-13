import React from 'react';
import { Store, EmptyObject } from 'redux';
import { IDialogsState, IProfileState, IActionType } from './interfaces';

const StoreContext = React.createContext(
  {} as Store<
    EmptyObject & {
      dialogsReducer: IDialogsState;
      profileReducer: IProfileState;
    },
    IActionType
  >
);

export default StoreContext;
