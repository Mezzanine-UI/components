/* eslint-disable no-nested-ternary */
import { CSSProperties, FC, ReactNode } from 'react';
import { get } from 'lodash';
import { ErrorMessage } from '@hookform/error-message';
import {
  FormField,
  FormLabel,
  FormMessage,
  Typography,
  cx,
} from '@mezzanine-ui/react';
import { Severity } from '@mezzanine-ui/system/severity';
import { DeepRequired, FieldErrorsImpl, useFormContext } from 'react-hook-form';
import Hints from './Hints';
import { ErrorMessageFn } from '../typing';
import classes from './index.module.scss';

export interface BaseFieldProps {
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  disabledErrMsg?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: FieldErrorsImpl<DeepRequired<any>>;
  fieldClassName?: string;
  label?: ReactNode;
  labelClassName?: string;
  name: string;
  remark?: ReactNode;
  remarkIcon?: ReactNode;
  required?: boolean;
  style?: CSSProperties;
  baseFieldStyle?: CSSProperties;
  width?: number;
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

export const BaseField: FC<BaseFieldProps> = ({
  children,
  className,
  disabled,
  fullWidth = false,
  disabledErrMsg = false,
  errors: errorsProp,
  fieldClassName,
  label,
  labelClassName,
  name,
  remark,
  remarkIcon,
  required,
  style,
  baseFieldStyle,
  width,
  errorMsgRender,
  horizontal = false,
  hints = [],
}) => {
  const { formState } = useFormContext();
  const errors = errorsProp || formState.errors;
  const styleVar = {
    '--width': width ? `${width}px` : fullWidth ? '100%' : undefined,
    ...style,
  } as CSSProperties;
  const baseFieldStyleVar = {
    '--width': width ? `${width}px` : fullWidth ? '100%' : undefined,
    ...baseFieldStyle,
  } as CSSProperties;
  const isError = !disabledErrMsg && get(errors, name);

  return (
    <FormField
      className={cx(classes.host, width && classes.specifiedWidth, className)}
      style={baseFieldStyleVar}
      disabled={disabled}
      severity={isError ? 'error' : undefined}
    >
      <div
        className={cx(classes.wrapper, {
          [classes.horizontal]: horizontal,
        })}
      >
        {!!label && (
          <div className={classes.labelWrapper}>
            <FormLabel
              className={cx(classes.label, classes.basicLabel, labelClassName)}
              htmlFor={name}
              remark={remark}
              remarkIcon={remarkIcon}
            >
              {label as React.JSX.Element}
              {required && (
                <Typography
                  variant="caption"
                  color="error"
                  className={classes.requiredMark}
                >
                  *
                </Typography>
              )}
            </FormLabel>
          </div>
        )}
        <div className={cx(classes.field, fieldClassName)} style={styleVar}>
          {children}
          {hints.length > 0 && <Hints hints={hints} />}
        </div>
      </div>

      {!disabledErrMsg && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={
            errorMsgRender ||
            (({ message }) => (
              <FormMessage style={{ position: 'static' }}>
                {message}
              </FormMessage>
            ))
          }
        />
      )}
    </FormField>
  );
};
