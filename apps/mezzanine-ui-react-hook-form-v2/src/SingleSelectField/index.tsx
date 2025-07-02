import { useMemo, useCallback, useState, useEffect } from 'react';
import { Select, SelectValue, Option, cx } from '@mezzanine-ui/react';
import { SelectSingleProps } from '@mezzanine-ui/react/Select/Select';
import { FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { BaseField } from '../BaseField';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import classes from './index.module.scss';

export type SingleSelectFieldProps = HookFormFieldProps<
  FieldValues,
  Omit<SelectSingleProps, 'defaultValue' | 'mode'>,
  {
    width?: number;
    valueIsString?: boolean;
    options: SelectValue[];
    defaultValue?: string;
    horizontal?: boolean;
    onFetchMore?: () => Promise<SelectValue[]>;
  }
>;

export const SingleSelectField: HookFormFieldComponent<
  SingleSelectFieldProps
> = ({
  className,
  clearable = false,
  defaultValue,
  disabled,
  width,
  valueIsString = true,
  inputMode,
  itemScope = false,
  label,
  itemsInView,
  options,
  placeholder = '請選擇',
  popperOptions,
  registerName,
  remark,
  renderValue,
  required,
  role,
  size = 'large',
  menuSize = 'large',
  menuMaxHeight = 186,
  style,
  errorMsgRender,
  onChange: onChangeProp,
  disabledErrMsg,
  onFetchMore,
  horizontal,
  hints,
  ...restProps
}) => {
  const [currentOptions, setOptions] = useState<SelectValue[]>(options);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);

  useEffect(() => {
    setOptions(options);
  }, [options]);

  const {
    clearErrors,
    formState: { errors },
    control,
    resetField,
    setValue,
  } = useFormContext();

  const watchValue = useWatch({
    control,
    name: registerName,
    defaultValue,
  });

  const watchValueInOptions = useMemo(() => {
    if (valueIsString) {
      return currentOptions?.find((o) => o.id === watchValue) ?? null;
    }

    return watchValue ?? null;
  }, [currentOptions, watchValue, valueIsString]);

  const onClear = () => {
    resetField(registerName);
    const clearValue = valueIsString ? '' : null;
    setValue(registerName, clearValue, { shouldDirty: true });
  };

  const onMenuScroll = useCallback(
    async ({
      scrollTop,
      maxScrollTop,
    }: {
      scrollTop: number;
      maxScrollTop: number;
    }) => {
      if (scrollTop + 40 >= maxScrollTop && !fetchLoading && onFetchMore) {
        setFetchLoading(true);

        const newOptions = await onFetchMore();

        if (newOptions.length > 0) {
          setOptions((prev) => [...prev, ...newOptions]);
        }

        setFetchLoading(false);
      }
    },
    [fetchLoading, onFetchMore],
  );

  const onChange = (newValue: SelectValue) => {
    if (errors?.[registerName]) clearErrors(registerName);

    const value = valueIsString ? newValue.id : newValue;

    setValue(registerName, value, { shouldDirty: true });
    onChangeProp?.(newValue);
  };

  return (
    <BaseField
      disabled={disabled}
      name={registerName}
      style={style}
      label={label}
      remark={remark}
      required={required}
      className={cx(
        classes.host,
        width && classes.specifiedWidth,
        className,
        'mzn-rhf-select-field',
      )}
      width={width}
      disabledErrMsg={disabledErrMsg}
      errorMsgRender={errorMsgRender}
      horizontal={horizontal}
      hints={hints}
    >
      <Select
        {...restProps}
        role={role}
        inputMode={inputMode}
        itemScope={itemScope}
        fullWidth
        clearable={clearable}
        itemsInView={itemsInView}
        mode="single"
        onClear={onClear}
        onChange={onChange}
        placeholder={placeholder}
        popperOptions={popperOptions}
        renderValue={renderValue}
        size={size}
        value={watchValueInOptions}
        menuSize={menuSize}
        menuMaxHeight={menuMaxHeight}
        onMenuScroll={onMenuScroll}
      >
        {currentOptions?.map((option) => (
          <Option key={option.id} value={option.id}>
            {option.name}
          </Option>
        ))}
      </Select>
    </BaseField>
  );
};
