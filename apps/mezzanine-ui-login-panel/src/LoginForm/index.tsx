import { FC, ReactNode, useState } from 'react';
import { InputFieldProps } from '@mezzanine-ui/react-hook-form-v2';
import * as Yup from 'yup';
import Login from './Login';
import Forget from './Forget';
import {
  LoginFormValues,
  ForgetFormValues,
  NeedChangePasswordFormValues,
  LoginPageEnum,
  NeedChangePasswordMode,
} from './typing';

export interface LoginFormProps {
  /**
   * 放置 logo
   */
  logo?: ReactNode;
  /**
   * 密碼至少需要的長度
   */
  passwordLength?: number;
  /**
   * 密碼不可與前 `number` 代重複
   */
  generationLimit?: number;
  /**
   * `number` 天後需要變更密碼
   */
  keepPasswordDaysLimit?: number;
  /**
   * 登入顯示的字，預設 `登入`
   */
  generalLoginText?: string;
  /**
   * 登入時觸發。
   * 若需要變更密碼，呼叫 `needChangePassword` 並給予模式，模式有 `FIRST` 和 `TOO_LONG`，對應`初次啟用`和`過久需要變更`
   */
  onLogin: ({
    values,
    needChangePassword,
  }: {
    values: LoginFormValues;
    needChangePassword: ({ mode }: { mode: NeedChangePasswordMode }) => void;
  }) => Promise<void>;
  /**
   * 變更密碼時觸發
   */
  onNeedChangePassword?: ({
    values,
    account,
    oldPassword,
  }: {
    values: NeedChangePasswordFormValues;
    account: string;
    oldPassword: string;
  }) => Promise<boolean>;
  /**
   * 寄忘記密碼信時觸發
   */
  onSendForgetAccount?: ({
    values,
  }: {
    values: ForgetFormValues;
  }) => Promise<boolean>;
  /**
   * 自定義啟用帳號時額外輸入欄位
   */
  customizedActivateFields?: InputFieldProps[];
  /**
   * 自定義啟用帳號時額外輸入欄位驗證
   */
  customizedActivateSchema?: Yup.ObjectSchema<object>;
  /**
   * 自定義密碼提示
   */
  customizedHint?: string;
  /**
   * 自定義密碼規則
   */
  customizedRule?: RegExp;
  /**
   * 自定義登入密碼提示
   */
  customizedLoginPasswordHint?: string[];
  /**
   * 是否顯示忘記密碼
   */
  notShowForgotPassword?: boolean;
}

/**
 * 後台登入 UI 元件
 */
export const LoginForm: FC<LoginFormProps> = ({
  logo,
  passwordLength,
  generationLimit,
  keepPasswordDaysLimit = 60,
  generalLoginText = '登入',
  onLogin,
  onNeedChangePassword,
  onSendForgetAccount,
  customizedActivateFields,
  customizedActivateSchema,
  customizedHint,
  customizedRule,
  customizedLoginPasswordHint,
  notShowForgotPassword = false,
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
          customizedActivateFields={customizedActivateFields}
          customizedActivateSchema={customizedActivateSchema}
          customizedHint={customizedHint}
          customizedRule={customizedRule}
          customizedLoginPasswordHint={customizedLoginPasswordHint}
          notShowForgotPassword={notShowForgotPassword}
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
