import { DateTimePicker, DateTimePickerProps, cx } from '@mezzanine-ui/react';
import {
  FieldValues,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import { BaseField } from '../BaseField';
import classes from './index.module.scss';

export type DateTimePickerFieldProps = HookFormFieldProps<
  FieldValues,
  DateTimePickerProps
> & {
  width?: number;
};

export const DateTimePickerField: HookFormFieldComponent<
  DateTimePickerFieldProps
> = ({
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
  isDateDisabled,
  label,
  width,
  minuteStep,
  placeholder = '選擇日期',
  readOnly,
  referenceDate,
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

  const onChange = (newDate: string | undefined) => {
    if (errors?.[registerName]) clearErrors(registerName);

    contextSetValue(registerName, newDate, { shouldDirty: true });
    onChangeProp?.(newDate);
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
      <DateTimePicker
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
        isDateDisabled={isDateDisabled}
        inputProps={inputProps}
        size={size}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        referenceDate={referenceDate}
        value={value}
      />
    </BaseField>
  );
};
