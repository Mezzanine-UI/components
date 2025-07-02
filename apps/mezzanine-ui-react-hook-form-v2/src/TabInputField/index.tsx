import { Key } from 'react';
import { FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { SelectProps, Tab, TabPane, Tabs, cx } from '@mezzanine-ui/react';
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
    onChange?: (newTab: Key) => void;
  }
>;

export const TabInputField: HookFormFieldComponent<TabInputFieldProps> = ({
  className,
  options = [],
  registerName,
  style,
  onChange: onChangeProp,
}) => {
  const { control: contextControl, setValue } = useFormContext();

  const watchValue = useWatch({
    control: contextControl,
    name: registerName,
  });

  const onChange = (key: Key) => {
    setValue(registerName, key, { shouldValidate: true });
    onChangeProp?.(key);
  };

  return (
    <Tabs
      activeKey={watchValue}
      className={cx(className, 'mzn-rhf-tab-input-field')}
      onChange={onChange}
      style={style}
    >
      {options?.map((option) => (
        <TabPane
          key={option.id}
          tab={
            <Tab className={cx(classes.tab, 'mzn-rhf-tab-input-field__tab')}>
              {option?.name}
            </Tab>
          }
        />
      ))}
    </Tabs>
  );
};
