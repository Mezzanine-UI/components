import { useMemo } from 'react';
import { AutoComplete, cx, SelectValue } from '@mezzanine-ui/react';
import { AutoCompleteSingleProps } from '@mezzanine-ui/react/Select/AutoComplete';
import { FormEventHandler } from 'react';
import { FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { BaseField } from '../BaseField';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import classes from './index.module.scss';

export type AutoCompleteSingleFieldProps = HookFormFieldProps<
  Omit<FieldValues, 'defaultValue' | 'onInput' | 'onChange'>,
  Omit<AutoCompleteSingleProps, 'mode'>,
  {
    defaultValue?: SelectValue;
    debounceMs?: number;
    width?: number;
    onInput?: FormEventHandler<HTMLInputElement>;
    onChange?: (newOption: SelectValue) => void;
  }
>;

export const AutoCompleteSingleField: HookFormFieldComponent<
  AutoCompleteSingleFieldProps
> = ({
  control,
  debounceMs,
  defaultValue,
  disabled,
  fullWidth = true,
  label,
  options,
  placeholder = '請輸入',
  onInput,
  registerName,
  remark,
  required,
  size = 'large',
  style,
  className,
  value,
  width,
  disabledErrMsg,
  errorMsgRender,
  onChange: onChangeProp,
  ...props
}) => {
  const {
    clearErrors,
    formState: { errors },
    setValue,
  } = useFormContext();

  const watchValue = useWatch({ name: registerName, defaultValue });

  const watchValueInOptions = useMemo(
    () => options?.find((o) => o.id === watchValue) ?? null,
    [options, watchValue],
  );

  const onChange = (newValue: SelectValue) => {
    if (errors?.[registerName]) {
      clearErrors(registerName);
    }

    if (newValue) {
      setValue(registerName, newValue.id, { shouldDirty: true });
    } else {
      setValue(registerName, null);
    }
    onChangeProp?.(newValue);
  };

  return (
    <BaseField
      disabled={disabled}
      style={style}
      label={label}
      name={registerName}
      remark={remark}
      required={required}
      width={width}
      disabledErrMsg={disabledErrMsg}
      errorMsgRender={errorMsgRender}
      className={cx(classes.host, className)}
    >
      <AutoComplete
        {...props}
        mode="single"
        aria-autocomplete="none"
        menuSize="large"
        itemsInView={10}
        size={size}
        fullWidth={width ? false : fullWidth}
        onChange={onChange}
        inputProps={{ onInput }}
        placeholder={placeholder}
        defaultValue={defaultValue}
        options={options}
        value={watchValueInOptions}
      />
    </BaseField>
  );
};
