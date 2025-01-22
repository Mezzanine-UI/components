import { useContext } from 'react';
import { LayoutContext, LayoutContextValues } from './LayoutProvider';

export const useLayout = (): LayoutContextValues => {
  const layout = useContext(LayoutContext);

  if (!layout) {
    throw new Error('Please provide Layout');
  }

  return layout;
};
