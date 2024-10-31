import { DatePicker, DatePickerProps, cx } from '@mezzanine-ui/react';
import {
  FieldValues,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import { BaseField } from '../BaseField';
import classes from './index.module.scss';

export type DatePickerFieldProps = HookFormFieldProps<
  FieldValues,
  DatePickerProps,
  {
    width?: number;
  }
>;

export const DatePickerField: HookFormFieldComponent<DatePickerFieldProps> = ({
  clearable = true,
  className,
  control,
  disabled,
  format,
  isDateDisabled,
  label,
  mode,
  onCalendarToggle,
  placeholder = '選擇日期',
  readOnly,
  referenceDate,
  register,
  registerName,
  remark,
  required,
  style,
  defaultValue,
  size = 'large',
  width,
  errorMsgRender,
  disabledErrMsg,
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

  const watchingValue = useWatch({ name: registerName, defaultValue });

  const { errors } = useFormState({ control: control || contextControl });

  const registration = (register || contextRegister)(registerName);

  const onChange = (newDate?: string) => {
    if (errors?.[registerName]) clearErrors(registerName);
    contextSetValue(registerName, newDate, { shouldDirty: true });
    onChangeProp?.(newDate);
  };

  const inputProps = {
    autoComplete: 'off',
    ...registration,
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
      <DatePicker
        {...props}
        fullWidth
        disabled={disabled}
        clearable={clearable}
        format={format}
        inputProps={inputProps}
        isDateDisabled={isDateDisabled}
        mode={mode}
        onCalendarToggle={onCalendarToggle}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        referenceDate={referenceDate}
        size={size}
        value={watchingValue}
      />
    </BaseField>
  );
};
