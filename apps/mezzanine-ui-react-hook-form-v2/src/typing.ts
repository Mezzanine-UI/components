import { CSSProperties, HTMLInputTypeAttribute, ReactNode } from 'react';
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
  MultipleFieldErrors,
} from 'react-hook-form';
import { Severity } from '@mezzanine-ui/system/severity';

export type ErrorMessageFn = (data: {
  message: string;
  messages?: MultipleFieldErrors | undefined;
}) => ReactNode;

export interface FieldProps<Type extends FieldValues>
  extends Omit<RegisterOptions<Type>, 'render' | 'onChange' | 'onBlur'> {
  disabled?: boolean;
  disabledErrMsg?: boolean;
  label?: ReactNode;
  placeholder?: string;
  required?: boolean;
  autoComplete?: 'on' | 'off';
  autoFocus?: boolean;
  remark?: ReactNode;
  remarkIcon?: ReactNode;
  style?: CSSProperties;
  className?: string;
  type?: HTMLInputTypeAttribute;
  fullWidth?: boolean;
  errorMsgRender?: ErrorMessageFn;
  horizontal?: boolean;
  hints?:
    | string[]
    | {
        severity?: Severity | 'info';
        text: string;
        iconAlignment?: 'top' | 'bottom' | 'center';
      }[];
}

export interface RegisteredFieldProps<Type extends FieldValues>
  extends FieldProps<Type> {
  register?: UseFormRegister<Type>;
  control?: Control<any>;
  registerName: Path<Type>;
  name?: string;
}

export type HookFormFieldProps<
  T extends FieldValues,
  OriginProps extends Record<string, any>,
  OptionalProps extends Record<string, any> | unknown = unknown,
> = OriginProps & RegisteredFieldProps<T> & OptionalProps;

export type HookFormFieldComponent<Props extends FieldValues> =
  React.FunctionComponent<Props>;

export type OptionItemType<ID extends string = string> = {
  id: ID;
  name: string;
};

export type OptionItemsType = OptionItemType[];

export type OptionItemGroupsType = {
  label: string;
  options: OptionItemsType;
}[];
