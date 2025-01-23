import { ChangeEventHandler, useMemo } from 'react';
import { Input, InputProps, cx } from '@mezzanine-ui/react';
import { FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { BaseField } from '../BaseField';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import classes from './index.module.scss';

export type InputFieldProps<T extends FieldValues = FieldValues> =
  HookFormFieldProps<
    T,
    InputProps,
    {
      maxLength?: number;
      minLength?: number;
      width?: number;
      inputClassName?: string;
    }
  >;

export const InputField: HookFormFieldComponent<InputFieldProps> = ({
  autoComplete = 'off',
  autoFocus,
  className,
  inputClassName,
  clearable = true,
  control,
  defaultValue,
  disabled,
  disabledErrMsg,
  width,
  label,
  maxLength,
  max,
  min,
  minLength,
  name,
  placeholder = '請輸入...',
  prefix,
  pattern,
  register,
  registerName,
  remark: remarkProps,
  required,
  role,
  size = 'large',
  style,
  suffix,
  tagsProps,
  type,
  errorMsgRender,
  horizontal,
  hints,
  onChange: onChangeProp,
  ...prop
}) => {
  const {
    control: contextControl,
    register: contextRegister,
    setValue,
    trigger,
  } = useFormContext();

  const watchValue = useWatch({
    control: control || contextControl,
    name: registerName,
    defaultValue,
  });

  const registration = (register || contextRegister)(registerName, {
    maxLength,
    max,
    pattern,
    min,
    minLength,
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChangeProp?.(e);

    if (e.type === 'change') {
      setValue(registerName, e.target.value, { shouldDirty: true });

      // eslint-disable-next-line no-underscore-dangle
      if (contextControl._options.mode === 'onChange') trigger(registerName);
    } else {
      setValue(registerName, '');
    }
  };

  const remark = useMemo(() => {
    if (remarkProps) {
      return remarkProps;
    }

    if (maxLength) {
      return `${watchValue?.length ?? 0}/${maxLength}`;
    }

    return undefined;
  }, [maxLength, remarkProps, watchValue?.length]);

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
      horizontal={horizontal}
      hints={hints}
    >
      <Input
        {...prop}
        fullWidth
        role={role}
        className={inputClassName}
        size={size}
        clearable={clearable}
        defaultValue={defaultValue}
        placeholder={placeholder}
        prefix={prefix}
        disabled={disabled}
        value={watchValue || ''}
        suffix={suffix}
        onChange={onChange}
        tagsProps={tagsProps}
        inputProps={{
          autoComplete,
          autoFocus,
          maxLength,
          minLength,
          type,
          ...registration,
          ...prop,
        }}
      />
    </BaseField>
  );
};
