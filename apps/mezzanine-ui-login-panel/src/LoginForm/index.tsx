import { FC, ReactNode, useState } from 'react';
import { InputFieldProps } from '@mezzanine-ui/react-hook-form-v2';
import * as Yup from 'yup';
import Login from './Login';
import Forgot from './Forgot';
import {
  LoginFormValues,
  ForgotFormValues,
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
   * 登入顯示的字
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
  onSendForgotPassword?: ({
    values,
  }: {
    values: ForgotFormValues;
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
  loginTitle?: string;
  accountFieldLabel?: string;
  /**
   * 帳號欄位 placeholder
   */
  accountFieldPlaceholder?: string;
  passwordFieldLabel?: string;
  passwordFieldPlaceholder?: string;
  forgotPasswordButtonText?: string;
  forgotPasswordTitle?: string;
  forgotPasswordAccountFieldLabel?: string;
  /**
   * 忘記密碼帳號欄位 placeholder
   */
  forgotPasswordAccountFieldPlaceholder?: string;
  forgotPasswordSendText?: string;
  /**
   * 忘記密碼提示，預設值 `請輸入註冊時使用的email帳號 密碼重置連結將發送至該信箱`
   */
  forgotPasswordHint?: string;
  forgotPasswordSuccessTitle?: string;
  /**
   * 忘記密碼成功後提示，預設值 `請於1小時內點擊連結設定密碼。 若未收到email或遇連結失效請聯絡管理員。`
   */
  forgotPasswordSuccessHint?: string;
  activateTitle?: string;
  tooLongTitle?: string;
  tooLoginWarning?: (keepPasswordDaysLimit: number) => string;
  needChangePasswordFieldLabel?: string;
  needChangePasswordFieldPlaceholder?: string;
  needChangeConfirmPasswordFieldLabel?: string;
  needChangeConfirmPasswordFieldPlaceholder?: string;
  needChangeSubmitText?: string;
  needChangeCancelText?: string;
  needChangeSuccessText?: string;
  backToLoginText?: string;
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
  onSendForgotPassword,
  customizedActivateFields,
  customizedActivateSchema,
  customizedHint,
  customizedRule,
  customizedLoginPasswordHint,
  notShowForgotPassword = false,
  loginTitle = '帳號登入',
  accountFieldLabel = '帳號',
  accountFieldPlaceholder = '請輸入帳號',
  passwordFieldLabel = '密碼',
  passwordFieldPlaceholder = '請輸入密碼',
  forgotPasswordButtonText = '忘記密碼',
  forgotPasswordTitle = '重新設定密碼',
  forgotPasswordAccountFieldLabel = '帳號',
  forgotPasswordAccountFieldPlaceholder = '輸入帳號 e.g. example@email.com',
  forgotPasswordSendText = '送出',
  forgotPasswordHint = `請輸入註冊時使用的email帳號
密碼重置連結將發送至該信箱`,
  forgotPasswordSuccessTitle = '密碼重置連結已發送至',
  forgotPasswordSuccessHint = `請於1小時內點擊連結設定密碼。
若未收到email或遇連結失效請聯絡管理員。`,
  activateTitle = '歡迎啟用帳號 請設定密碼',
  tooLongTitle = '為了您的帳戶安全，請立即更新',
  tooLoginWarning = (keepPasswordDaysLimit) =>
    `您的密碼已超過 ${keepPasswordDaysLimit} 天未更新`,
  needChangePasswordFieldLabel = '設定密碼',
  needChangePasswordFieldPlaceholder = '請輸入密碼',
  needChangeConfirmPasswordFieldLabel = '再次輸入密碼',
  needChangeConfirmPasswordFieldPlaceholder = '請再次輸入密碼',
  needChangeSubmitText = '確認',
  needChangeCancelText = '取消',
  needChangeSuccessText = `密碼設置完成！
請使用新密碼登入`,
  backToLoginText = '返回登入頁面',
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
          loginTitle={loginTitle}
          accountFieldLabel={accountFieldLabel}
          accountFieldPlaceholder={accountFieldPlaceholder}
          passwordFieldLabel={passwordFieldLabel}
          passwordFieldPlaceholder={passwordFieldPlaceholder}
          onNeedChangePassword={onNeedChangePassword}
          setCurrentPage={setCurrentPage}
          customizedActivateFields={customizedActivateFields}
          customizedActivateSchema={customizedActivateSchema}
          customizedHint={customizedHint}
          customizedRule={customizedRule}
          customizedLoginPasswordHint={customizedLoginPasswordHint}
          notShowForgotPassword={notShowForgotPassword}
          forgotPasswordButtonText={forgotPasswordButtonText}
          activateTitle={activateTitle}
          tooLongTitle={tooLongTitle}
          tooLoginWarning={tooLoginWarning}
          needChangePasswordFieldLabel={needChangePasswordFieldLabel}
          needChangePasswordFieldPlaceholder={
            needChangePasswordFieldPlaceholder
          }
          needChangeConfirmPasswordFieldLabel={
            needChangeConfirmPasswordFieldLabel
          }
          needChangeConfirmPasswordFieldPlaceholder={
            needChangeConfirmPasswordFieldPlaceholder
          }
          needChangeSubmitText={needChangeSubmitText}
          needChangeCancelText={needChangeCancelText}
          needChangeSuccessText={needChangeSuccessText}
          backToLoginText={backToLoginText}
        />
      );

    case LoginPageEnum.FORGOT:
      return (
        <Forgot
          logo={logo}
          title={forgotPasswordTitle}
          onSendForgotPassword={onSendForgotPassword}
          setCurrentPage={setCurrentPage}
          forgotPasswordAccountFieldLabel={forgotPasswordAccountFieldLabel}
          forgotPasswordAccountFieldPlaceholder={
            forgotPasswordAccountFieldPlaceholder
          }
          forgotPasswordSendText={forgotPasswordSendText}
          forgotPasswordHint={forgotPasswordHint}
          forgotPasswordSuccessTitle={forgotPasswordSuccessTitle}
          forgotPasswordSuccessHint={forgotPasswordSuccessHint}
          backToLoginText={backToLoginText}
        />
      );

    default:
      return null;
  }
};
