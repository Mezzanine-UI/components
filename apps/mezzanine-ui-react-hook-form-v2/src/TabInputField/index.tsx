import { Key, useMemo, useState } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import {
  SelectProps,
  SelectValue,
  Tab,
  TabPane,
  Tabs,
} from '@mezzanine-ui/react';
import {
  HookFormFieldComponent,
  HookFormFieldProps,
  OptionItemsType,
} from '../typing';
import classes from './index.module.scss';

export type TabInputFieldProps = HookFormFieldProps<
  FieldValues,
  Pick<SelectProps, 'required' | 'disabled' | 'style' | 'className'>,
  {
    options?: OptionItemsType;
    defaultValue?: SelectValue;
    onChange?: (newTab: Key) => void;
  }
>;

export const TabInputField: HookFormFieldComponent<TabInputFieldProps> = ({
  className,
  defaultValue,
  disabled,
  options = [],
  registerName,
  required,
  style,
  onChange: onChangeProp,
}) => {
  const [tabKey, setTabKey] = useState<Key>(defaultValue?.id || '');

  const { register, setValue } = useFormContext();

  const onChange = (key: Key) => {
    setTabKey(key);
    setValue(registerName, key, { shouldValidate: true });
    onChangeProp?.(key);
  };

  useMemo(
    () =>
      register(
        registerName,
        {
          required,
          disabled,
          value: tabKey,
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
      ),
    [register, registerName, required, disabled, tabKey],
  );

  return (
    <Tabs
      activeKey={tabKey}
      className={className}
      onChange={onChange}
      style={style}
    >
      {options?.map((option) => (
        <TabPane
          key={option.id}
          tab={<Tab className={classes.tab}>{option?.name}</Tab>}
        />
      ))}
    </Tabs>
  );
};
