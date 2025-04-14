import {
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
  useState,
  useCallback,
} from 'react';
import { InputFieldProps } from '@mezzanine-ui/react-hook-form-v2';
import * as Yup from 'yup';
import {
  LoginFormValues,
  NeedChangePasswordFormValues,
  LoginPageEnum,
  NeedChangePasswordMode,
} from '../typing';
import NeedChange from './NeedChange';
import General from './General';

interface LoginProps {
  logo?: ReactNode;
  passwordLength?: number;
  generationLimit?: number;
  keepPasswordDaysLimit: number;
  generalLoginText: string;
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
  customizedActivateFields?: InputFieldProps[];
  customizedActivateSchema?: Yup.ObjectSchema<object>;
  customizedHint?: string;
  customizedRule?: RegExp;
  customizedLoginPasswordHint?: string[];
  notShowForgotPassword?: boolean;
  loginTitle: string;
  accountFieldLabel: string;
  accountFieldPlaceholder: string;
  passwordFieldLabel: string;
  passwordFieldPlaceholder: string;
  forgotPasswordButtonText: string;
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
  customizedActivateFields,
  customizedActivateSchema,
  customizedHint,
  customizedRule,
  customizedLoginPasswordHint,
  notShowForgotPassword = false,
  loginTitle,
  accountFieldLabel,
  accountFieldPlaceholder,
  passwordFieldLabel,
  passwordFieldPlaceholder,
  forgotPasswordButtonText,
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
      await onLoginProps({
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
        customizedActivateFields={customizedActivateFields}
        customizedActivateSchema={customizedActivateSchema}
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
      loginTitle={loginTitle}
      accountFieldLabel={accountFieldLabel}
      accountFieldPlaceholder={accountFieldPlaceholder}
      passwordFieldLabel={passwordFieldLabel}
      passwordFieldPlaceholder={passwordFieldPlaceholder}
      setCurrentPage={setCurrentPage}
      customizedLoginPasswordHint={customizedLoginPasswordHint}
      notShowForgotPassword={notShowForgotPassword}
      forgotPasswordButtonText={forgotPasswordButtonText}
    />
  );
};

export default Login;
