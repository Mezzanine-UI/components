export interface ForgotFormValues {
  account: string;
}

export interface LoginFormValues {
  account: string;
  password: string;
}

export interface NeedChangePasswordFormValues {
  password: string;
  confirmPassword: string;
}

export enum NeedChangePasswordMode {
  FIRST = 'FIRST',
  TOO_LONG = 'TOO_LONG',
}

export enum LoginPageEnum {
  LOGIN = 'LOGIN',
  FORGOT = 'FORGOT',
}
