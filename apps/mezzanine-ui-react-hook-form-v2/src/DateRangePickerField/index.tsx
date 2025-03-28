import { useMemo, useCallback } from 'react';
import dayjs from 'dayjs';
import {
  FieldValues,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { DateRangePicker, DateRangePickerProps, cx } from '@mezzanine-ui/react';
import { RangePickerValue } from '@mezzanine-ui/core/picker';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import { BaseField } from '../BaseField';
import classes from './index.module.scss';

export type DateRangePickerFieldProps = HookFormFieldProps<
  FieldValues,
  DateRangePickerProps,
  {
    width?: number;
    valuesAreMaxRange?: boolean;
  }
>;

export const DateRangePickerField: HookFormFieldComponent<
  DateRangePickerFieldProps
> = ({
  clearable = true,
  className,
  control,
  defaultValue,
  disabled,
  format,
  inputFromPlaceholder = 'yyyy-mm-dd',
  inputToPlaceholder = 'yyyy-mm-dd',
  isDateDisabled,
  label,
  width,
  valuesAreMaxRange = true,
  mode,
  onCalendarToggle,
  readOnly,
  referenceDate,
  register,
  registerName,
  remark,
  required,
  style,
  size = 'large',
  horizontal,
  hints,
}) => {
  const {
    control: contextControl,
    register: contextRegister,
    setValue,
  } = useFormContext();

  const watchValue = useWatch({
    control: control || contextControl,
    name: registerName as string,
    defaultValue,
  });

  const { errors } = useFormState({ control: control || contextControl });

  const registration = useMemo(
    () =>
      (register || contextRegister)(
        registerName,
        {
          required,
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
      ),
    [register, contextRegister, registerName, required],
  );

  const inputProps = {
    autoComplete: 'off',
    ...registration,
  };

  const onChange = useCallback(
    (newDate?: RangePickerValue) => {
      if (valuesAreMaxRange) {
        setValue(
          registerName,
          [
            dayjs(newDate?.[0]).startOf('day').toISOString(),
            dayjs(newDate?.[1]).endOf('day').toISOString(),
          ],
          { shouldDirty: true },
        );
      } else {
        setValue(registerName, newDate, { shouldDirty: true });
      }
    },
    [registerName, setValue, valuesAreMaxRange],
  );

  return (
    <BaseField
      disabled={disabled}
      errors={errors}
      className={cx(classes.host, className)}
      style={style}
      label={label}
      name={registerName}
      remark={remark}
      width={width}
      required={required}
      horizontal={horizontal}
      hints={hints}
    >
      <DateRangePicker
        fullWidth
        clearable={clearable}
        format={format}
        isDateDisabled={isDateDisabled}
        inputToProps={inputProps}
        mode={mode}
        onChange={onChange}
        onCalendarToggle={onCalendarToggle}
        inputFromPlaceholder={inputFromPlaceholder}
        inputToPlaceholder={inputToPlaceholder}
        readOnly={readOnly}
        referenceDate={referenceDate}
        size={size}
        value={watchValue}
      />
    </BaseField>
  );
};
