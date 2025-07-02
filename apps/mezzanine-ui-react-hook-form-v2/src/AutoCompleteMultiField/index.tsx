import { useMemo } from 'react';
import { compact } from 'lodash';
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
    valueIsStringArray?: boolean;
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
  valueIsStringArray = true,
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
    resetField,
    setValue,
  } = useFormContext();

  const watchValue = useWatch({ name: registerName, defaultValue });

  const watchValueInOptions = useMemo(() => {
    if (valueIsStringArray) {
      return (
        compact(
          watchValue.map((id: string) => {
            const target = options.find((op) => op.id === id);

            if (target) {
              return target;
            }

            return null;
          }),
        ) ?? []
      );
    }

    return watchValue ?? [];
  }, [options, watchValue, valueIsStringArray]);

  const onClear = () => {
    resetField(registerName);
    setValue(registerName, [], { shouldDirty: true });
  };

  const onChange = (newValue: SelectValue[]) => {
    if (errors?.[registerName]) {
      clearErrors(registerName);
    }

    if (!(maxLength && maxLength > 0 && newValue.length > maxLength)) {
      const value = valueIsStringArray
        ? newValue.map((item) => item.id)
        : newValue;

      setValue(registerName, value, { shouldDirty: true });
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
      className={cx(classes.host, className, 'mzn-rhf-auto-complete')}
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
        onClear={onClear}
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
