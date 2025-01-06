import { FC, ReactNode, useState } from 'react';
import Login from './Login';
import Forget from './Forget';
import {
  LoginFormValues,
  ForgetFormValues,
  NeedChangePasswordFormValues,
  LoginPageEnum,
  NeedChangePasswordMode,
} from './typing';

interface LoginFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logo: ReactNode;
  passwordLength?: number;
  generationLimit?: number;
  keepPasswordDaysLimit?: number;
  onLogin: ({
    values,
    needChangePassword,
  }: {
    values: LoginFormValues;
    needChangePassword: ({
      account,
      password,
      mode,
    }: {
      account: string;
      password: string;
      mode: NeedChangePasswordMode;
    }) => void;
  }) => Promise<void>;
  onNeedChangePassword: ({
    values,
    account,
    oldPassword,
  }: {
    values: NeedChangePasswordFormValues;
    account: string;
    oldPassword: string;
  }) => Promise<boolean>;
  onSendForgetAccount: ({
    values,
  }: {
    values: ForgetFormValues;
  }) => Promise<boolean>;
}

export const LoginForm: FC<LoginFormProps> = ({
  logo,
  passwordLength = 10,
  generationLimit = 6,
  keepPasswordDaysLimit = 60,
  onLogin,
  onNeedChangePassword,
  onSendForgetAccount,
}) => {
  const [currentPage, setCurrentPage] = useState<LoginPageEnum>(
    LoginPageEnum.LOGIN,
  );

  switch (currentPage) {
    case LoginPageEnum.LOGIN:
      return (
        <Login
          logo={logo}
          passwordLength={passwordLength}
          generationLimit={generationLimit}
          keepPasswordDaysLimit={keepPasswordDaysLimit}
          onLogin={onLogin}
          onNeedChangePassword={onNeedChangePassword}
          setCurrentPage={setCurrentPage}
        />
      );

    case LoginPageEnum.FORGET:
      return (
        <Forget
          logo={logo}
          onSendForgetAccount={onSendForgetAccount}
          setCurrentPage={setCurrentPage}
        />
      );

    default:
      return null;
  }
};
