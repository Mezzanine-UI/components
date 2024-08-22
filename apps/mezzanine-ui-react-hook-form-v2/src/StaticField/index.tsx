import { Typography, cx } from '@mezzanine-ui/react';
import { FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { BaseField } from '../BaseField';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import classes from './index.module.scss';

export type StaticFieldProps<T extends FieldValues = FieldValues> =
  HookFormFieldProps<
    T,
    object,
    {
      width?: number;
    }
  >;

export const StaticField: HookFormFieldComponent<StaticFieldProps> = ({
  className,
  control,
  disabled,
  disabledErrMsg,
  width,
  label,
  registerName,
  remark,
  required,
  style,
  errorMsgRender,
}) => {
  const { control: contextControl } = useFormContext();

  const watchValue = useWatch({
    control: control || contextControl,
    name: registerName,
  });

  return (
    <BaseField
      className={cx(classes.host, width && classes.specifiedWidth, className)}
      name={registerName}
      disabledErrMsg={disabledErrMsg}
      style={style}
      required={required}
      remark={remark}
      disabled={disabled}
      label={label}
      width={width}
      errorMsgRender={errorMsgRender}
    >
      <Typography variant="body1" color="text-primary">
        {watchValue}
      </Typography>
    </BaseField>
  );
};
