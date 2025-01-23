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

  const watchValueInOptions = useMemo(
    () => currentOptions?.find((o) => o.id === watchValue) ?? null,
    [currentOptions, watchValue],
  );

  const onClear = () => {
    resetField(registerName);
    setValue(registerName, '', { shouldDirty: true });
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

    setValue(registerName, newValue.id);
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
      className={cx(classes.host, width && classes.specifiedWidth, className)}
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
