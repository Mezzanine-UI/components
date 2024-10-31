import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { Icon } from '@mezzanine-ui/react';
import { SearchIcon } from '@mezzanine-ui/icons';
import { Input, InputProps, cx } from '@mezzanine-ui/react';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import classes from './index.module.scss';

export type SearchInputFieldProps<T extends FieldValues = FieldValues> =
  HookFormFieldProps<T, InputProps> & {
    width?: number;
  };

export const SearchInputField: HookFormFieldComponent<
  SearchInputFieldProps
> = ({
  className,
  clearable = true,
  defaultValue,
  disabled,
  placeholder = '輸入關鍵字搜尋...',
  registerName,
  size = 'medium',
  width,
  suffix,
}) => {
  const { control, setValue } = useFormContext();

  const watchValue =
    useWatch({
      control,
      name: registerName,
      defaultValue,
    }) || defaultValue;

  const [displayValue, setDisplayValue] = useState<string>(watchValue);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = useCallback(
    debounce((v) => {
      setValue(registerName, v, { shouldDirty: true });
    }, 500),
    [],
  );

  useEffect(() => {
    debouncedOnChange(displayValue);
  }, [displayValue, debouncedOnChange]);

  return (
    <div style={{ width: width ?? '100%' }}>
      <Input
        className={cx(classes.host, className)}
        clearable={clearable}
        fullWidth
        size={size}
        suffix={suffix}
        disabled={disabled}
        inputProps={{
          id: registerName,
          name: registerName,
          type: 'search',
        }}
        onChange={(e) => setDisplayValue(e.target.value)}
        placeholder={placeholder}
        prefix={<Icon icon={SearchIcon} className={classes.icon} />}
        value={displayValue}
      />
    </div>
  );
};
