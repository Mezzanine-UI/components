import {
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
  useState,
  useCallback,
} from 'react';
import {
  LoginFormValues,
  NeedChangePasswordFormValues,
  LoginPageEnum,
  NeedChangePasswordMode,
} from '../typing';
import NeedChange from './NeedChange';
import General from './General';

interface LoginProps {
  logo: ReactNode;
  passwordLength?: number;
  generationLimit?: number;
  keepPasswordDaysLimit: number;
  generalLoginText?: string;
  onLogin: ({
    values,
    needChangePassword,
  }: {
    values: LoginFormValues;
    needChangePassword: ({ mode }: { mode: NeedChangePasswordMode }) => void;
  }) => Promise<void>;
  onNeedChangePassword?: ({
    values,
    account,
    oldPassword,
  }: {
    values: NeedChangePasswordFormValues;
    account: string;
    oldPassword: string;
  }) => Promise<boolean>;
  setCurrentPage: Dispatch<SetStateAction<LoginPageEnum>>;
  customizedHint?: string;
  customizedRule?: RegExp;
  notShowForgotPassword?: boolean;
}

const Login: FC<LoginProps> = ({
  logo,
  passwordLength,
  generationLimit,
  keepPasswordDaysLimit,
  generalLoginText,
  onLogin: onLoginProps,
  onNeedChangePassword,
  setCurrentPage,
  customizedHint,
  customizedRule,
  notShowForgotPassword = false,
}) => {
  const [needChangePasswordParams, setNeedChangePasswordParams] = useState<{
    account: string;
    password: string;
    mode: NeedChangePasswordMode | null;
  }>({
    account: '',
    password: '',
    mode: null,
  });

  const onLogin = useCallback(
    async ({ values }: { values: LoginFormValues }) => {
      onLoginProps({
        values,
        needChangePassword: ({ mode }) => {
          setNeedChangePasswordParams({
            account: values.account,
            password: values.password,
            mode,
          });
        },
      });
    },
    [onLoginProps],
  );

  if (
    needChangePasswordParams.account &&
    needChangePasswordParams.password &&
    needChangePasswordParams.mode
  ) {
    return (
      <NeedChange
        mode={needChangePasswordParams.mode}
        logo={logo}
        passwordLength={passwordLength}
        generationLimit={generationLimit}
        keepPasswordDaysLimit={keepPasswordDaysLimit}
        onNeedChangePassword={onNeedChangePassword}
        account={needChangePasswordParams.account}
        oldPassword={needChangePasswordParams.password}
        onBack={() => {
          setNeedChangePasswordParams({
            account: '',
            password: '',
            mode: null,
          });
        }}
        customizedHint={customizedHint}
        customizedRule={customizedRule}
      />
    );
  }

  return (
    <General
      logo={logo}
      generalLoginText={generalLoginText}
      onLogin={onLogin}
      setCurrentPage={setCurrentPage}
      notShowForgotPassword={notShowForgotPassword}
    />
  );
};

export default Login;
