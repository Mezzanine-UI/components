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
  passwordLength: number;
  generationLimit?: number;
  keepPasswordDaysLimit: number;
  generalLoginText?: string;
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
  setCurrentPage: Dispatch<SetStateAction<LoginPageEnum>>;
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
        needChangePassword: ({ account, password, mode }) => {
          setNeedChangePasswordParams({
            account,
            password,
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
      />
    );
  }

  return (
    <General
      logo={logo}
      generalLoginText={generalLoginText}
      onLogin={onLogin}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default Login;
