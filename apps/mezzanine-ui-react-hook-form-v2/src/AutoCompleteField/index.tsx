import { FC } from 'react';
import {
  AutoCompleteSingleField,
  AutoCompleteSingleFieldProps,
} from '../AutoCompleteSingleField';
import {
  AutoCompleteMultiField,
  AutoCompleteMultiFieldProps,
} from '../AutoCompleteMultiField';

interface AutoCompleteFieldSingleModeProps
  extends AutoCompleteSingleFieldProps {
  mode: 'single';
}

interface AutoCompleteFieldMultipleModeProps
  extends AutoCompleteMultiFieldProps {
  mode: 'multiple';
}

export type AutoCompleteFieldProps =
  | AutoCompleteFieldSingleModeProps
  | AutoCompleteFieldMultipleModeProps;

export const AutoCompleteField: FC<AutoCompleteFieldProps> = (props) => {
  if (props.mode === 'single') {
    return <AutoCompleteSingleField {...props} />;
  }

  if (props.mode === 'multiple') {
    return <AutoCompleteMultiField {...props} />;
  }
};
