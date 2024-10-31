/* eslint-disable react-hooks/exhaustive-deps */
import { cx, Input, InputProps } from '@mezzanine-ui/react';
import { TagsType } from '@mezzanine-ui/react/Form/useInputWithTagsModeValue';
import { useCallback } from 'react';
import {
  FieldValues,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { BaseField } from '../BaseField';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import classes from './index.module.scss';

type OmittedInputProps = Omit<
  InputProps,
  'mode' | 'tagsProps' | 'defaultValue' | 'onChange'
> &
  InputProps['tagsProps'];

export type InputTagsModeFieldProps<T extends FieldValues = FieldValues> =
  HookFormFieldProps<
    T,
    OmittedInputProps,
    {
      maxLength?: number;
      minLength?: number;
      defaultValue?: string[];
      inputDefaultValue?: string;
      width?: number;
      inputClassName?: string;
    }
  >;

export const InputTagsModeField: HookFormFieldComponent<
  InputTagsModeFieldProps
> = ({
  autoComplete = 'off',
  autoFocus,
  className,
  clearable = true,
  control,
  defaultValue,
  inputDefaultValue,
  disabled,
  width,
  fullWidth,
  label,
  maxLength,
  min,
  minLength,
  name,
  placeholder = '請輸入',
  prefix,
  register,
  registerName,
  remark,
  required,
  valueAsDate,
  valueAsNumber,
  role,
  size,
  style,
  suffix,
  initialTagsValue,
  maxTagsLength,
  inputClassName,
  inputPosition,
  disabledErrMsg,
  errorMsgRender,
  onTagsChange: onTagsChangeProp,
  horizontal,
  hints,
  ...props
}) => {
  const {
    control: contextControl,
    register: contextRegister,
    setValue,
  } = useFormContext();

  const watchValue = useWatch({
    control: control || contextControl,
    name: registerName as string,
  });

  const { errors } = useFormState({ control: control || contextControl });

  const registration = (register || contextRegister)(registerName, {
    maxLength,
    min,
    minLength,
  });

  const onTagsChange = useCallback((newTags: TagsType) => {
    setValue(registerName, newTags, {
      shouldDirty: true,
    });
    onTagsChangeProp?.(newTags);
  }, []);

  return (
    <BaseField
      className={cx(classes.host, width && classes.specifiedWidth, className)}
      name={registerName}
      errors={errors}
      style={style}
      required={required}
      remark={remark}
      disabled={disabled}
      label={label}
      width={width}
      fullWidth={fullWidth}
      disabledErrMsg={disabledErrMsg}
      errorMsgRender={errorMsgRender}
      horizontal={horizontal}
      hints={hints}
    >
      <Input
        {...props}
        fullWidth
        role={role}
        className={inputClassName}
        size={size}
        clearable={clearable}
        placeholder={placeholder}
        prefix={prefix}
        defaultValue={inputDefaultValue}
        disabled={disabled}
        mode="tags"
        suffix={suffix}
        tagsProps={{
          initialTagsValue: watchValue || defaultValue || [],
          maxTagsLength,
          inputPosition,
          onTagsChange,
        }}
        inputProps={{
          autoComplete,
          autoFocus,
          maxLength,
          minLength,
          type: 'text',
          ...registration,
        }}
      />
    </BaseField>
  );
};
