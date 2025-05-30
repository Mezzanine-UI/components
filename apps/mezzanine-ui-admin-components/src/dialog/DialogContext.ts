/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { DialogConfigType } from './typing';

export interface DialogContextValues {
  openDialog: (config: DialogConfigType) => void | Promise<boolean>;
  closeDialog: VoidFunction;
  resolve: (value: boolean) => void;
}

export const DialogContext = createContext<DialogContextValues>({
  openDialog: () => {},
  closeDialog: () => {},
  resolve: () => {},
});

export const DialogContextProvider = DialogContext.Provider;
