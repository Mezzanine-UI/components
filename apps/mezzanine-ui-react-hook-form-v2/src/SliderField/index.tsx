/* eslint-disable react-hooks/exhaustive-deps */
import { Slider, SliderProps } from '@mezzanine-ui/react';
import { CSSProperties, useMemo } from 'react';
import {
  FieldValues,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { BaseField } from '../BaseField';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';

export type SliderFieldProps = HookFormFieldProps<
  FieldValues,
  Omit<SliderProps, 'value' | 'defaultValue' | 'onChange'>,
  {
    defaultValue?: number;
    width?: number;
    onChange?: (value: number) => void;
  }
>;

export const SliderField: HookFormFieldComponent<SliderFieldProps> = ({
  control,
  min = 0,
  max = 100,
  disabled,
  label,
  register,
  registerName,
  defaultValue,
  remark,
  required,
  step = 1,
  withInput = true,
  style,
  width,
  disabledErrMsg,
  errorMsgRender,
  onChange: onChangeProp,
  fullWidth = true,
  ...props
}) => {
  const {
    control: contextControl,
    register: contextRegister,
    setValue,
  } = useFormContext();

  const { errors } = useFormState({ control: control || contextControl });

  const watchValue =
    useWatch({ name: registerName, defaultValue }) || defaultValue || 100;

  const onChange = (v: number) => {
    setValue(registerName, v, { shouldValidate: true });
    onChangeProp?.(v);
  };

  useMemo(
    () =>
      (register || contextRegister)(registerName, {
        required,
      }),
    [registerName, required],
  );

  return (
    <BaseField
      disabled={disabled}
      style={
        {
          ...style,
          '--width': '100%',
        } as CSSProperties
      }
      label={label}
      name={registerName}
      remark={remark}
      errors={errors}
      required={required}
      width={width}
      fullWidth={fullWidth}
      disabledErrMsg={disabledErrMsg}
      errorMsgRender={errorMsgRender}
    >
      <Slider
        {...props}
        withInput={withInput}
        min={min}
        max={max}
        step={step}
        value={watchValue}
        onChange={onChange}
      />
    </BaseField>
  );
};
