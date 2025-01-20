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
  logo: ReactNode;
  passwordLength?: number;
  generationLimit?: number;
  keepPasswordDaysLimit?: number;
  generalLoginText?: string;
  onLogin: ({
    values,
    needChangePassword,
  }: {
    values: LoginFormValues;
    needChangePassword: ({ mode }: { mode: NeedChangePasswordMode }) => void;
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
  generationLimit,
  keepPasswordDaysLimit = 60,
  generalLoginText,
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
          generalLoginText={generalLoginText}
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
