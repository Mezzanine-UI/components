import { useMemo } from 'react';
import {
  TreeSelect,
  TreeSelectOption,
  TreeSelectProps,
  cx,
} from '@mezzanine-ui/react';
import { FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { BaseField } from '../BaseField';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import classes from './index.module.scss';

export type SingleTreeSelectFieldProps = HookFormFieldProps<
  FieldValues,
  Omit<TreeSelectProps, 'mode' | 'onChange'>,
  {
    width?: number;
    defaultValue?: TreeSelectOption<string>;
    onChange?: (value: TreeSelectOption<string>) => void;
  }
>;

export const SingleTreeSelectField: HookFormFieldComponent<
  SingleTreeSelectFieldProps
> = ({
  className,
  clearable = true,
  defaultValue,
  disabled,
  fullWidth = false,
  label,
  placeholder = '請選擇',
  registerName,
  remark,
  required,
  style,
  width,
  disabledErrMsg,
  errorMsgRender,
  onChange: onChangeProp,
  options,
  value,
  horizontal,
  hints,
  ...props
}) => {
  const {
    clearErrors,
    formState: { errors },
    setValue,
  } = useFormContext();

  const watchValue = useWatch({
    name: registerName as string,
    defaultValue,
  });

  const filedValue = useMemo(
    () => (watchValue ? [watchValue] : undefined),
    [watchValue],
  );

  const onChange = (newValue: TreeSelectOption[]) => {
    if (errors?.[registerName]) clearErrors(registerName);

    const targetValue = newValue[0];

    setValue(registerName, targetValue, { shouldDirty: true });
    onChangeProp?.(targetValue);
  };

  return (
    <BaseField
      disabled={disabled}
      name={registerName}
      style={style}
      label={label}
      remark={remark}
      required={required}
      className={cx(classes.host, width && classes.specifiedWidth, className)}
      width={width}
      fullWidth={fullWidth}
      errors={errors}
      disabledErrMsg={disabledErrMsg}
      errorMsgRender={errorMsgRender}
      horizontal={horizontal}
      hints={hints}
    >
      <TreeSelect
        {...props}
        mode="single"
        clearable={clearable}
        fullWidth
        placeholder={placeholder}
        onChange={onChange}
        options={options}
        value={filedValue}
      />
    </BaseField>
  );
};
