import { FC } from 'react';
import {
  SingleSelectField,
  SingleSelectFieldProps,
} from '../SingleSelectField';
import { MultiSelectField, MultiSelectFieldProps } from '../MultiSelectField';

interface SelectFieldSingleModeProps extends SingleSelectFieldProps {
  mode: 'single';
}

interface SelectFieldMultipleModeProps extends MultiSelectFieldProps {
  mode: 'multiple';
}

export type SelectFieldProps =
  | SelectFieldSingleModeProps
  | SelectFieldMultipleModeProps;

export const SelectField: FC<SelectFieldProps> = (props) => {
  if (props.mode === 'single') {
    return <SingleSelectField {...props} />;
  }

  if (props.mode === 'multiple') {
    return <MultiSelectField {...props} />;
  }
};
