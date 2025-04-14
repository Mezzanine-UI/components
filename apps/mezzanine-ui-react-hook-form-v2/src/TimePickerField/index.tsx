import { TimePicker, TimePickerProps, cx } from '@mezzanine-ui/react';
import {
  FieldValues,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import { BaseField } from '../BaseField';
import classes from './index.module.scss';

export type TimePickerFieldProps = HookFormFieldProps<
  FieldValues,
  TimePickerProps
> & {
  width?: number;
};

export const TimePickerField: HookFormFieldComponent<TimePickerFieldProps> = ({
  clearable = true,
  className,
  control,
  defaultValue,
  disabled,
  format,
  hideHour,
  hideMinute,
  hideSecond,
  hourStep,
  label,
  width,
  minuteStep,
  placeholder = '選擇時間',
  readOnly,
  register,
  registerName,
  remark,
  required,
  secondStep,
  style,
  size = 'large',
  hourPrefix,
  minutePrefix,
  secondPrefix,
  disabledErrMsg,
  errorMsgRender,
  onChange: onChangeProp,
  horizontal,
  hints,
  ...props
}) => {
  const {
    control: contextControl,
    register: contextRegister,
    setValue: contextSetValue,
    clearErrors,
  } = useFormContext();

  const { errors } = useFormState({ control: control || contextControl });

  const value = useWatch({ name: registerName, defaultValue }) || defaultValue;

  const registration = (register || contextRegister)(registerName);

  const inputProps = {
    autoComplete: 'off',
    ...registration,
  };

  const onChange = (newTime: string | undefined) => {
    if (errors?.[registerName]) clearErrors(registerName);

    contextSetValue(registerName, newTime, { shouldDirty: true });
    onChangeProp?.(newTime);
  };

  return (
    <BaseField
      disabled={disabled}
      errors={errors}
      style={style}
      label={label}
      name={registerName}
      remark={remark}
      required={required}
      width={width}
      className={cx(classes.host, width && classes.specifiedWidth, className)}
      disabledErrMsg={disabledErrMsg}
      errorMsgRender={errorMsgRender}
      horizontal={horizontal}
      hints={hints}
    >
      <TimePicker
        {...props}
        fullWidth
        disabled={disabled}
        hideHour={hideHour}
        hideMinute={hideMinute}
        hideSecond={hideSecond}
        hourStep={hourStep}
        minuteStep={minuteStep}
        secondStep={secondStep}
        hourPrefix={hourPrefix}
        minutePrefix={minutePrefix}
        secondPrefix={secondPrefix}
        clearable={clearable}
        format={format}
        inputProps={inputProps}
        size={size}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        value={value}
      />
    </BaseField>
  );
};
