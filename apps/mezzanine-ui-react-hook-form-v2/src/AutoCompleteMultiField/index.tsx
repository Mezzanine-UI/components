import { useMemo } from 'react';
import { AutoComplete, cx, SelectValue } from '@mezzanine-ui/react';
import { AutoCompleteSingleProps } from '@mezzanine-ui/react/Select/AutoComplete';
import { FormEventHandler } from 'react';
import { FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { BaseField } from '../BaseField';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import classes from './index.module.scss';

export type AutoCompleteMultiFieldProps = HookFormFieldProps<
  Omit<FieldValues, 'defaultValue' | 'onInput' | 'onChange'>,
  Omit<AutoCompleteSingleProps, 'mode'>,
  {
    defaultValue?: SelectValue[];
    debounceMs?: number;
    width?: number;
    onInput?: FormEventHandler<HTMLInputElement>;
    onChange?: (newOption: SelectValue[]) => void;
    maxLength?: number;
  }
>;

export const AutoCompleteMultiField: HookFormFieldComponent<
  AutoCompleteMultiFieldProps
> = ({
  addable,
  control,
  debounceMs,
  defaultValue,
  disabled,
  fullWidth = true,
  label,
  options,
  placeholder = '請輸入',
  onInput,
  onInsert,
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
  maxLength,
  horizontal,
  hints,
  ...props
}) => {
  const {
    clearErrors,
    formState: { errors },
    setValue,
  } = useFormContext();

  const watchValue = useWatch({ name: registerName, defaultValue });

  const watchValueInOptions = useMemo(
    () => options?.filter((o) => watchValue?.includes(o.id)) ?? undefined,
    [options, watchValue],
  );

  const onChange = (newValue: SelectValue[]) => {
    if (errors?.[registerName]) {
      clearErrors(registerName);
    }

    if (!(maxLength && maxLength > 0 && newValue.length > maxLength)) {
      setValue(
        registerName,
        newValue.map((item) => item.id),
        { shouldDirty: true },
      );
      onChangeProp?.(newValue);
    }
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
      horizontal={horizontal}
      hints={hints}
      className={cx(classes.host, className)}
    >
      <AutoComplete
        {...props}
        addable={addable}
        mode="multiple"
        aria-autocomplete="none"
        menuSize="large"
        itemsInView={10}
        size={size}
        fullWidth={width ? false : fullWidth}
        onChange={onChange}
        onInsert={onInsert}
        inputProps={{ onInput }}
        placeholder={placeholder}
        defaultValue={defaultValue}
        options={options}
        value={watchValueInOptions}
      />
    </BaseField>
  );
};
